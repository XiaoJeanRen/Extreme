const Discord = require("discord.js");
const config = require("../config.json");
module.exports = class gameReset{
  constructor(){
    this.name = 'gameReset',
    this.alias = ['遊戲重置'],
    this.usage = '!gameReset'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    
    console.log(`使用者(ID: ${playerID})使用gameReset`)
    if(playerID != config.gm) return message.reply("權限不足");
    if(playerID == config.gm) return message.reply("GM你好");
    
    
    



  }


}