const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const character_equip_info = require("../players_equip.json");
const equip = require("../all_item_id_data.json");
//查看角色裝備指令
module.exports = class gameReset{
  constructor(){
    this.name = 'myeq',
    this.alias = ['角色裝備'],
    this.usage = '!myeq'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = character_equip_info[playerID];
    let user = userData[playerID];
    if(!info) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色裝備」`)
    
    let playerInfoEmbed = new Discord.RichEmbed()
    .setAuthor(info.CharacterName)
    .addField("**角色裝備**",
    "**武器(左手)： **`物品id: " + info.Weapon1 + "` 名稱: `" + equip[info.Weapon1].Equip_Name  + "`\n" +
    "**武器(右手)： **`物品id: " + info.Weapon2 + "` 名稱: `" + equip[info.Weapon2].Equip_Name  + "`\n" +
    "**箭袋： **`物品id: "       + info.Arrowbag + "` 名稱: `" + equip[info.Arrowbag].Equip_Name  + "`\n" +
    "**頭盔： **`物品id: "      + info.Head    + "` 名稱: `" + equip[info.Head].Equip_Name      + "`\n" +
    "**盔甲： **`物品id: "      + info.Body    + "` 名稱: `" + equip[info.Body].Equip_Name      + "`\n" +
    "**手套： **`物品id: "      + info.Gloves  + "` 名稱: `" + equip[info.Gloves].Equip_Name    + "`\n" +
    "**護腿： **`物品id: "      + info.Leg     + "` 名稱: `" + equip[info.Leg].Equip_Name       + "`\n" +
    "**鞋子： **`物品id: "      + info.Boots   + "` 名稱: `" + equip[info.Boots].Equip_Name     + "`\n" +
    "**戒指： **`物品id: "      + info.Ring    + "` 名稱: `" + equip[info.Ring].Equip_Name      + "`\n" +
    "**護身符： **`物品id: "      + info.Amulet  + "` 名稱: `" + equip[info.Amulet].Equip_Name    + "`\n" +
    "**箭矢數量： **`"       + info.Arrows  + "`\n" 
    )
    .setFooter(`負重 ${user.Character_Weight}  /  ${user.Character_MaxWeight}`,message.author.displayAvatarURL);

    message.reply(playerInfoEmbed).then(msg => {msg.delete(10000)});
  }

}