let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat];
  let ValidLink = (m.text.includes('https://') || m.text.includes('http://'))
  if (chat.antiLink && ValidLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}` : 0
    if (m.text.includes(thisGroup) && thisGroup != 0) throw false // jika link grup itu sendiri gak dikick
    await conn.reply(m.chat, `|!¤*'~``~'*¤!| 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 |!¤*'~``~'*¤!|\n ${await this.getName(m.sender)} 𝙀𝙎𝙏𝘼 𝙋𝙍𝙊𝙃𝙄𝘽𝙄𝘿𝙊 𝙀𝙉𝙑𝙄𝘼𝙍 𝙇𝙄𝙉𝙆 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊 𝙎𝙀𝙍𝘼𝙎 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘿𝙊 ${isBotAdmin ? '' : '\n\n(☝◞‸◟)☞ 𝙽𝙾 𝚂𝙾𝚈 𝙰𝙳𝙼𝙸𝙽 𝙰𝚂𝙸 𝚀𝚄𝙴 𝙽𝙾 𝙿𝚄𝙴𝙳𝙾 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝚁'}\n\n𝙀𝙎𝘾𝙍𝙄𝘽𝘼 .𝙊𝙁𝙁 𝘼𝙉𝙏𝙄𝙇𝙄𝙉𝙆 𝙋𝘼𝙍 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍 𝙀𝙎𝙏𝘼 𝙁𝙐𝙉𝘾𝙄𝙊𝙉${opts['restrict'] ? '' : '\n𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊 𝙇𝘼𝙎 𝙍𝙀𝙎𝙏𝙍𝙄𝘾𝘾𝙄𝙊𝙉𝙀𝙎 𝙀𝙎𝘾𝙍𝙍𝙄𝘽𝘼 *.𝙊𝙉 𝙍𝙀𝙎𝙏𝙍𝙄𝘾𝙏* 𝙋𝘼𝙍𝘼 𝘼𝘾𝙏𝙄𝙑𝘼𝙍𝙇𝙊'}`, '', '', '', m)
    if (global.opts['restrict']) {
      if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
    }
  }
  return true
}

module.exports = handler
