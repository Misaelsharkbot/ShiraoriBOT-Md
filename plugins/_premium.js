let handler = m => m

handler.before = async function (m) {
    let user = db.data.users[m.sender]
    if (m.chat.endsWith('broadcast')) return
    if (user.premiumTime != 0 && user.premium) {
        if (new Date() * 1 >= user.premiumTime) {
            await m.reply(`𝙎𝙚 𝙖𝙘𝙖𝙗𝙤 𝙩𝙪 𝙩𝙞𝙚𝙢𝙥𝙤 𝙙𝙚 𝙨𝙚𝙧 𝙋𝙍𝙀𝙈𝙄𝙐𝙈!`)
            user.premiumTime = 0
            user.premium = false
        }
    }
}

module.exports = handler
