const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../users_data.json");
const equip = require("../character_equip.json");
module.exports = class gameReset{
  constructor(){
    this.name = 'myequip',
    this.alias = ['角色裝備'],
    this.usage = '!myequip'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = equip[playerID];
    let user = userData[playerID];
    if(!info) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色裝備」`)

    let playerInfoEmbed = new Discord.RichEmbed()
    .setAuthor(info.characterName)
    .addField("**角色裝備**",
    "**武器(左手)： **" + info.weapon1 + "\n" +
    "**武器(右手)： **" + info.weapon2 + "\n" +
    "**頭盔： **" + info.head + "\n" +
    "**盔甲： **" + info.body + "\n" +
    "**手套： **" + info.gloves + "\n" +
    "**護腿： **" + info.leg + "\n" +
    "**鞋子： **" + info.boots + "\n" +
    "**戒指： **" + info.ring + "\n" +
    "**項鍊： **" + info.amulet
    )
    .setFooter(`負重 ${user.weight}  /  ${user.max_Weight}`,message.author.displayAvatarURL);

    message.reply(playerInfoEmbed).then(msg => {msg.delete(5000)});
  }

}