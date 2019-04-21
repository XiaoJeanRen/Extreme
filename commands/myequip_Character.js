const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const character_equip_info = require("../character_equip.json");
const equip = require("../all_item_id_data.json");
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
    .setAuthor(info.characterName)
    .addField("**角色裝備**",
    "**武器(左手)： **`物品id: " + info.weapon1 + "` 名稱: `" + equip[info.weapon1].equip_Name  + "`\n" +
    "**武器(右手)： **`物品id: " + info.weapon2 + "` 名稱: `" + equip[info.weapon2].equip_Name  + "`\n" +
    "**頭盔： **`物品id: "      + info.head    + "` 名稱: `" + equip[info.head].equip_Name      + "`\n" +
    "**盔甲： **`物品id: "      + info.body    + "` 名稱: `" + equip[info.body].equip_Name      + "`\n" +
    "**手套： **`物品id: "      + info.gloves  + "` 名稱: `" + equip[info.gloves].equip_Name    + "`\n" +
    "**護腿： **`物品id: "      + info.leg     + "` 名稱: `" + equip[info.leg].equip_Name       + "`\n" +
    "**鞋子： **`物品id: "      + info.boots   + "` 名稱: `" + equip[info.boots].equip_Name     + "`\n" +
    "**戒指： **`物品id: "      + info.ring    + "` 名稱: `" + equip[info.ring].equip_Name      + "`\n" +
    "**項鍊： **`物品id: "      + info.amulet  + "` 名稱: `" + equip[info.amulet].equip_Name    + "`"
    )
    .setFooter(`負重 ${user.weight}  /  ${user.max_Weight}`,message.author.displayAvatarURL);

    message.reply(playerInfoEmbed).then(msg => {msg.delete(10000)});
  }

}