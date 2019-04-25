const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const itemData = require("../all_item_id_data.json");
//查看物品詳細資料
module.exports = class check_item{
  constructor(){
    this.name = 'monkey',
    this.alias = ['猴子'],
    this.usage = '!frog'
  }

  async run(bot, message, args){
    await message.delete();

  
    message.channel.send("https://i2.kknews.cc/SIG=pdcaep/2540000p42o701o5p71.jpg").then(msg => {msg.delete(50000)});
  }

}