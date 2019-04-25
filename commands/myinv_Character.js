const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");
const inv = require("../players_inventory.json");
//查看背包指令
module.exports = class myinv{
  constructor(){
    this.name = 'myinv',
    this.alias = ['角色背包','inv'],
    this.usage = '!myinv'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    let myinv_info = inv[playerID];
    //console.log(myinv_info.inv_1.ItemID)
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色背包」`)
    //console.log(equip[myinv_info.inv_1.itemID].Equip_Name);
    //console.log(myinv_info.inv_1.Item_ID);
    let playerInvEmbed = new Discord.RichEmbed()
    .setAuthor(info.CharacterName)
    .setColor(info.Character_Color)
    .addField("**角色背包**",
    "**空間1： **`物品id: " + myinv_info.inv_1.itemID + "` 名稱: `" +equip[myinv_info.inv_1.itemID].Equip_Name + "`\n" +
    "**空間2： **`物品id: " + myinv_info.inv_2.itemID + "` 名稱: `" +equip[myinv_info.inv_2.itemID].Equip_Name + "`\n" +
    "**空間3： **`物品id: " + myinv_info.inv_3.itemID + "` 名稱: `" +equip[myinv_info.inv_3.itemID].Equip_Name + "`\n" +
    "**空間4： **`物品id: " + myinv_info.inv_4.itemID + "` 名稱: `" +equip[myinv_info.inv_4.itemID].Equip_Name + "`\n" +
    "**空間5： **`物品id: " + myinv_info.inv_5.itemID + "` 名稱: `" +equip[myinv_info.inv_5.itemID].Equip_Name + "`\n" +
    "**空間6： **`物品id: " + myinv_info.inv_6.itemID + "` 名稱: `" +equip[myinv_info.inv_6.itemID].Equip_Name + "`\n" +
    "**空間7： **`物品id: " + myinv_info.inv_7.itemID + "` 名稱: `" +equip[myinv_info.inv_7.itemID].Equip_Name + "`\n" +
    "**空間8： **`物品id: " + myinv_info.inv_8.itemID + "` 名稱: `" +equip[myinv_info.inv_8.itemID].Equip_Name + "`\n" +
    "**空間9： **`物品id: " + myinv_info.inv_9.itemID + "` 名稱: `" +equip[myinv_info.inv_9.itemID].Equip_Name + "`\n" +
    "**空間10： **`物品id: " + myinv_info.inv_10.itemID + "` 名稱: `" +equip[myinv_info.inv_10.itemID].Equip_Name + "`"
    )
    .setFooter(`負重 ${info.Character_Weight}  /  ${info.Character_MaxWeight}`,message.author.displayAvatarURL);

    message.reply(playerInvEmbed).then(msg => {msg.delete(10000)});
  }
}