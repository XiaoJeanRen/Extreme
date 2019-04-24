const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const itemData = require("../all_item_id_data.json");
//查看物品詳細資料
module.exports = class check_item{
  constructor(){
    this.name = 'frog',
    this.alias = ['翔哥','井蛙','蔡凱翔','凱翔'],
    this.usage = '!frog'
  }

  async run(bot, message, args){
    await message.delete();

  
    message.channel.send("https://cdn.discordapp.com/attachments/510498355743424514/570566586658848788/58444373_2121420704560695_6351973678338539520_n.png").then(msg => {msg.delete(10000)});
  }

}