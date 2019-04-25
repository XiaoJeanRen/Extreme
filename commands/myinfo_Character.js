const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//查看角色狀態指令
module.exports = class myinfo{
  constructor(){
    this.name = 'myinfo',
    this.alias = ['角色資訊','狀態','myi'],
    this.usage = '!myinfo'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色資訊」`)
    let nextLevelExp = info.Character_Level * 300 * 2.5;
    let difference = nextLevelExp - info.Character_Exp;
    
    let playerInfoEmbed = new Discord.RichEmbed()
    .setAuthor(info.CharacterName)
    .setColor(info.Character_Color)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("**角色稱號**", info.Character_Title)
    .addField("**角色資料**",
    "**生命： **" + info.Character_HP + " / " + info.Character_MaxHP + "\n" +
    "**魔力： **" + info.Character_MP + " / " + info.Character_MaxMP + "\n" +
    "**行動點數： **" + info.Character_AP + " / " + info.Character_MaxAP + "\n" +
    "**負量： **" + info.Character_Weight + " / " + info.Character_MaxWeight + "\n" +
    "**名聲： **" + info.Character_Reputation + "\n" +
    "**職業： **" + info.Character_Class + "\n" +
    "**冒險狀況： **" + info.Character_Adventure + "\n" +
    "**社會地位： **" + info.Character_Socialstatus + "\n" +
    "**所屬公會： **" + info.Character_Guild + "\n" +
    "**所屬家族： **" + info.Character_Family + "\n" +
    "**金錢💰： **" + info.Character_Money
    )
    .addField("等級","**目前等級：**" + info.Character_Level + "** 目前經驗：**" + info.Character_Exp)
    .setFooter(`離下一個等級還有 ${difference} 經驗值`,message.author.displayAvatarURL);

    message.reply(playerInfoEmbed).then(msg => {msg.delete(20000)});
  }

}