const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//查看背包指令
module.exports = class mystatus_character{
  constructor(){
    this.name = 'mys',
    this.alias = ['狀態欄','mystatus','status'],
    this.usage = '!mystatus'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色狀態」`)
    let nextLevelExp = info.Character_Level * 300 * 2.5;
    let difference = nextLevelExp - info.Character_Exp;
    let playerStatusEmbed = new Discord.RichEmbed()
    .setAuthor(info.CharacterName)
    .setColor(info.Character_Color)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("**角色稱號**", info.Character_Title)
    .addField("**角色詳細狀態**",
    "**生命： **" + info.Character_HP + " / " + info.Character_MaxHP + "\n" +
    "**魔力： **" + info.Character_MP + " / " + info.Character_MaxMP + "\n" +
    "**行動點數： **" + info.Character_AP + " / " + info.Character_MaxAP + "\n" +
    "**負量： **" + info.Character_Weight + " / " + info.Character_MaxWeight + "\n" +
    "**力量(STR)：**" + info.Character_Str + "\n" +
    "**智慧(INT)：**" + info.Character_Int + "\n" +
    "**敏捷(DEX)：**" + info.Character_Dex + "\n" +
    "**命中(ACC)：**" + info.Character_Acc + "\n" +
    "**物理攻擊力： **" + info.Character_DMG + "\n" +
    "**魔法攻擊力： **" + info.Character_M_DMG + "\n" +
    "**防禦力： **" + info.Character_DEF + "\n" +
    "**爆擊率： **" + info.Character_Strike + "\n" +
    "**命中率： **" + info.Character_Accurate + "\n" +
    "**(打/斬/刺/毒)傷害： **(" + 
    info.Character_HIT_DMG + "/" + 
    info.Character_CUT_DMG + "/" +
    info.Character_POKE_DMG + "/" + 
    info.Character_POISON_DMG + ")" + "\n" +
    "**(打/斬/刺/毒)防禦： **(" + 
    info.Character_HIT_DEF + "/" + 
    info.Character_CUT_DEF + "/" +
    info.Character_POKE_DEF + "/" + 
    info.Character_POISON_DEF + ")" + "\n" +
    "**(火/水/木/雷/光/暗)傷害： **(" + 
    info.Character_FIRE_DMG + "/" + 
    info.Character_COLD_DMG + "/" +
    info.Character_WOOD_DMG + "/" + 
    info.Character_LIGHT_DMG + "/" +
    info.Character_BRIGHT_DMG + "/" + 
    info.Character_DARK_DMG + ")" + "\n" +
    "**(火/水/木/雷/光/暗)抗性： **(" + 
    info.Character_FIRE_DEF + "/" + 
    info.Character_COLD_DEF + "/" +
    info.Character_WOOD_DEF + "/" + 
    info.Character_LIGHT_DEF + "/" +
    info.Character_BRIGHT_DEF + "/" + 
    info.Character_DARK_DEF + ")" + "\n" +
    "**金錢💰： **" + info.Character_Money
    )
    .addField("等級","**目前等級：**" + info.Character_Level + "** 目前經驗：**" + info.Character_Exp)
    .setFooter(`離下一個等級還有 ${difference} 經驗值`,message.author.displayAvatarURL);

    message.reply(playerStatusEmbed).then(msg => {msg.delete(20000)});
  }
}