let handler = m => m
handler.before = m => {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
*[β ] πΏπππΌπππ πΏπ ππππΌπ ππ πΌππ ${user.afkReason ? ' ππππππ: ' + user.afkReason : ''}*
*ππππππ πΏπ πππΌπΎππππ ${clockString(new Date - user.afk)}*
`.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user) continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0) continue
        let reason = user.afkReason || ''
        m.reply(`
βΓ³ Νγ€Γ²β Β‘ππ€ π‘π€ ππ©ππ¦πͺππ©ππ¨!

β’ ππ ππππΌπππ ππππΌ πππΌπΎππππ(πΌππ)  
β’ ${reason ? 'ππππππ πΏπ πππΌπΎπππππΏπΌπΏ: ' + reason : 'ππππππ πΏπ πππΌπΎπππππΏπΌπΏ: ππ πππππΎππππΎπ ππ ππππππ'}
β’ ππππππ πΏπ πππΌπΎπππππΏπΌπΏ: ${clockString(new Date - afkTime)}
`.trim())
    }
    return true
}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
