const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
module.exports = class myinfo{
  constructor(){
    this.name = 'myinfo',
    this.alias = ['角色資訊'],
    this.usage = '!myinfo'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色資訊」`)
    let nextLevelExp = info.level * 300 * 2.5;
    let difference = nextLevelExp - info.exp;
    
    let playerInfoEmbed = new Discord.RichEmbed()
    .setAuthor(info.characterName)
    .setColor(info.color)
    .addField("**角色資料**",
    "**生命： **" + info.hp + "\n" +
    "**魔力： **" + info.mp + "\n" +
    "**行動點數： **" + info.ap + "\n" +
    "**負量： **" + info.weight + " / " + info.max_Weight + "\n" +
    "**攻擊力： **" + info.atk + "\n" +
    "**防禦力： **" + info.def + "\n" +
    "**職業： **" + info.class + "\n" +
    "**金錢： **" + info.money
    )
    .addField("等級","**目前等級：**" + info.level + "** 目前經驗：**" + info.exp)
    .setFooter(`離下一個等級還有 ${difference} 經驗值`,message.author.displayAvatarURL);

    message.reply(playerInfoEmbed).then(msg => {msg.delete(10000)});
  }

}