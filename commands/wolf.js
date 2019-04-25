const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const itemData = require("../all_item_id_data.json");
//查看物品詳細資料
module.exports = class check_item{
  constructor(){
    this.name = 'wolf',
    this.alias = ['狼人殺'],
    this.usage = '!wolf'
  }

  async run(bot, message, args){
    await message.delete();

  
    message.channel.send("https://media.discordapp.net/attachments/510498355743424514/568004599609294850/57453567_378028376137698_2307911615787302912_n.png?width=368&height=473").then(msg => {msg.delete(50000)});
  }

}