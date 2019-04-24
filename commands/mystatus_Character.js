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
    console.log(`使用者(ID: ${playerID})使用「角色背包」`)
    let nextLevelExp = info.level * 300 * 2.5;
    let difference = nextLevelExp - info.exp;
    let playerStatusEmbed = new Discord.RichEmbed()
    .setAuthor(info.characterName)
    .setColor(info.color)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("**角色稱號**", info.title)
    .addField("**角色詳細狀態**",
    "**生命： **" + info.hp + " / " + info.max_Hp + "\n" +
    "**魔力： **" + info.mp + " / " + info.max_Mp + "\n" +
    "**行動點數： **" + info.ap + " / " + info.max_Ap + "\n" +
    "**負量： **" + info.weight + " / " + info.max_Weight + "\n" +
    "**攻擊力： **" + info.atk + "\n" +
    "**(火/冰/雷)傷害： **(" + 
    info.fight_fire_Damage + "/" + 
    info.fight_cold_Damage + "/" +
    info.fight_light_Damage + ")" + "\n" +
    "**防禦力： **" + info.def + "\n" +
    "**(火/冰/雷)抗性： **(" + 
    info.fight_fire_Defence + "/" + 
    info.fight_cold_Defence + "/" +
    info.fight_light_Defence + ")" + "\n" +
    "**力量(STR)：**" + info.str + "\n" +
    "**智慧(INT)：**" + info.int + "\n" +
    "**敏捷(DEX)：**" + info.dex + "\n" +
    "**金錢💰： **" + info.money
    )
    .addField("等級","**目前等級：**" + info.level + "** 目前經驗：**" + info.exp)
    .setFooter(`離下一個等級還有 ${difference} 經驗值`,message.author.displayAvatarURL);

    message.reply(playerStatusEmbed).then(msg => {msg.delete(20000)});
  }
}