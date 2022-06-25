let handler = m => m
handler.before = m => {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
*[⚠] 𝘿𝙀𝙅𝘼𝙎𝙏𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝘼𝙁𝙆 ${user.afkReason ? ' 𝙈𝙊𝙏𝙄𝙑𝙊: ' + user.afkReason : ''}*
*𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀 𝙄𝙉𝘼𝘾𝙏𝙄𝙑𝙊 ${clockString(new Date - user.afk)}*
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
☞ó ͜つò☞ ¡𝙉𝙤 𝙡𝙤 𝙚𝙩𝙞𝙦𝙪𝙚𝙩𝙚𝙨!

➢ 𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 𝙀𝙎𝙏𝘼 𝙄𝙉𝘼𝘾𝙏𝙄𝙑𝙊(𝘼𝙁𝙆)  
➢ ${reason ? '𝙈𝙊𝙏𝙄𝙑𝙊 𝘿𝙀 𝙄𝙉𝘼𝘾𝙏𝙄𝙑𝙄𝘿𝘼𝘿: ' + reason : '𝙈𝙊𝙏𝙄𝙑𝙊 𝘿𝙀 𝙄𝙉𝘼𝘾𝙏𝙄𝙑𝙄𝘿𝘼𝘿: 𝙉𝙊 𝙀𝙎𝙋𝙀𝘾𝙄𝙁𝙄𝘾𝙊 𝙐𝙉 𝙈𝙊𝙏𝙄𝙑𝙊'}
➢ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀 𝙄𝙉𝘼𝘾𝙏𝙄𝙑𝙄𝘿𝘼𝘿: ${clockString(new Date - afkTime)}
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
