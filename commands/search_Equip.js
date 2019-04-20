const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const equipData = require("../equip_ID_data.json");
module.exports = class search_Equip{
  constructor(){
    this.name = 'search_equip',
    this.alias = ['裝備搜尋'],
    this.usage = '!search_equip'
  }

  async run(bot, message, args){
    await message.delete();
    if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {msg.delete(1000)});
    let playerID = message.author.id;
    let itemID = args[1];
    if (!itemID) return message.reply("請輸入正確指令.").then(msg => {msg.delete(1000)});
    let info = equipData[itemID];
    if(!info) return message.reply("物品id不存在，請重新確認.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「搜尋」`)
    let playerInfoEmbed = new Discord.RichEmbed()
    .setAuthor(info.equip_Name)
    .addField("**裝備資料**",
    "**物品ID(item_Id)： **"            + info.item_Id + "\n" +
    "**物品類型(item_Type)： **"        + info.item_Type + "\n" +
    "**裝備名稱(equip_Name)： **"       + info.equip_Name + "\n" +
    "**裝備類型(equip_Type)： **"       + info.equip_Type + "\n" +
    "**增加血量(add_max_Hp)： **"       + info.add_max_Hp + "\n" +
    "**增加魔力(add_max_Mp)： **"       + info.add_max_Mp + "\n" +
    "**增加行動點數(add_max_Ap)： **"   + info.add_max_Ap + "\n" +
    "**增加負重(add_max_Weight)： **"   + info.add_max_Weight + "\n" +
    "**增加攻擊力(add_atk)： **"        + info.add_atk + "\n" +
    "**增加防禦力(add_def)： **"        + info.add_def + "\n" +
    "**需求等級(needLevel)： **"        + info.needLevel + "\n" +
    "**需求職業(needClass)： **"        + info.needClass + "\n" +
    "**需求負重(needWeight)： **"       + info.needWeight + "\n" +
    "**特殊能力(special)： **"          + info.special + "\n" +
    "**物品介紹(itemInfo)： **"         + info.itemInfo + "\n" 
    );

    message.reply(playerInfoEmbed).then(msg => {msg.delete(15000)});
  }

}