const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");
const inv = require("../players_inventory.json");
//查看背包指令
module.exports = class skillmagic{
  constructor(){
    this.name = 'skills_magic',
    this.alias = ['魔法師技能'],
    this.usage = '!skills_magic'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    

    message.reply(playerInvEmbed).then(msg => {msg.delete(10000)});
  }
}