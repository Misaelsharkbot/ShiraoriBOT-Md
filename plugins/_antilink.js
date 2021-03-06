let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat];
  let ValidLink = (m.text.includes('https://') || m.text.includes('http://'))
  if (chat.antiLink && ValidLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}` : 0
    if (m.text.includes(thisGroup) && thisGroup != 0) throw false // jika link grup itu sendiri gak dikick
    await conn.reply(m.chat, `|!Β€*'~``~'*Β€!| ππππππππ |!Β€*'~``~'*Β€!|\n ${await this.getName(m.sender)} ππππΌ ππππππ½ππΏπ πππππΌπ ππππ ππ ππππ πππππ ππππΌπ πππππππΌπΏπ ${isBotAdmin ? '' : '\n\n(βββΈβ)β π½πΎ ππΎπ π°π³πΌπΈπ½ π°ππΈ πππ΄ π½πΎ πΏππ΄π³πΎ π΄π»πΈπΌπΈπ½π°π'}\n\nπππΎπππ½πΌ .πππ πΌπππππππ ππΌπ πππππππΌπ ππππΌ ππππΎπππ${opts['restrict'] ? '' : '\nππππΌ πΏπππΌπΎππππΌπΏπ ππΌπ πππππππΎπΎπππππ πππΎππππ½πΌ *.ππ πππππππΎπ* ππΌππΌ πΌπΎππππΌπππ'}`, '', '', '', m)
    if (global.opts['restrict']) {
      if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
    }
  }
  return true
}

module.exports = handler
