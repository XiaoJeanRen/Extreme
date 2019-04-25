const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const itemData = require("../all_item_id_data.json");
//查看物品詳細資料
module.exports = class check_item{
  constructor(){
    this.name = 'check',
    this.alias = ['查看'],
    this.usage = '!check'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let itemID = args[1];
    if (!itemID) return message.reply("請輸入正確指令.").then(msg => {msg.delete(1000)});
    let info = itemData[itemID];
    if(!info) return message.reply("物品id不存在，請重新確認.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「搜尋」`)
    let playerInfoEmbed = new Discord.RichEmbed()
    .setAuthor(info.equip_Name)
    .addField("**裝備資料**",
    "**物品ID(item_Id)： **"                + info.item_Id + "\n" +
    "**物品類型(item_Type)： **"            + info.item_Type + "\n" +
    "**裝備名稱(equip_Name)： **"           + info.equip_Name + "\n" +
    "**裝備類型(equip_Type)： **"           + info.equip_Type + "\n" +
    "**裝備屬性(equip_Shape)： **"          + info.equip_Shape + "\n" +
    "**裝備品質(quality)： **"              + info.quality + "\n" +
    "**裝備強化度(strengthen)： **"         + info.strengthen + "\n" +
    "**裝備鑑定(Identification)： **"       + info.Identification + "\n" +
    "**特殊能力(special)： **"              + info.special + "\n" +
    "**物品價值(itemValue)： **"            + info.itemValue + "\n" +
    "**物品特殊id(itemSpecialId)： **"      + info.itemSpecialId + "\n" +
    "**物品介紹(itemInfo)： **"             + info.itemInfo + "\n"
    )
    .addField("**裝備需求屬性**",
    "**需求等級(needLevel)： **"            + info.needLevel + "\n" +
    "**需求職業(needClass)： **"            + info.needClass + "\n" +
    "**需求負重(needWeight)： **"           + info.needWeight + "\n" +
    "**需求力量(needStr)： **"              + info.needStr + "\n" +
    "**需求智慧(needInt)： **"              + info.needInt + "\n" +
    "**需求敏捷(needDex)： **"              + info.needDex + "\n"
    )
    .addField("**裝備增加屬性**",
    "**增加血量(add_max_Hp)： **"           + info.add_max_Hp + "\n" +
    "**增加魔力(add_max_Mp)： **"           + info.add_max_Mp + "\n" +
    "**增加行動點數(add_max_Ap)： **"       + info.add_max_Ap + "\n" +
    "**增加力量(add_Str)： **"              + info.add_Str + "\n" +
    "**增加智慧(add_Int)： **"              + info.add_Int + "\n" +
    "**增加敏捷(add_Dex)： **"              + info.add_Dex + "\n" +
    "**增加命中(add_Acc)： **"              + info.add_Acc + "\n" +
    "**增加負重(add_max_Weight)： **"       + info.add_max_Weight + "\n"
    )
    .addField("**裝備攻擊屬性**",
    "**增加物理攻擊力(add_atk)： **"            + info.add_atk + "\n" +
    "**增加魔法攻擊力(add_Matk)： **"            + info.add_Matk + "\n" +
    "**增加火焰傷害(add_fire_atk)： **"     + info.add_fire_atk + "\n" +
    "**增加冰冷傷害(add_cold_atk)： **"     + info.add_cold_atk + "\n" +
    "**增加閃電傷害(add_light_atk)： **"    + info.add_light_atk + "\n" 
    )
    .addField("**裝備防禦屬性**",
    "**增加物理防禦力(add_def)： **"            + info.add_def + "\n" +
    "**增加魔法防禦力(add_Mdef)： **"            + info.add_Mdef + "\n" +
    "**增加火焰抗性(add_fire_def)： **"     + info.add_fire_def + "\n" +
    "**增加冰冷抗性(add_cold_def)： **"     + info.add_cold_def + "\n" +
    "**增加閃電抗性(add_light_def)： **"    + info.add_light_def + "\n"
    )
    .addField("**裝備附魔**",
    "**第一附魔詞墜(one_Enchanting)： **"   + info.one_Enchanting + "\n" +
    "**第二附魔詞墜(second_Enchanting)： **"+ info.second_Enchanting + "\n" +
    "**第三附魔詞墜(third_Enchanting)： **" + info.third_Enchanting + "\n" +
    "**第四附魔詞墜(fourth_Enchanting)： **" + info.fourth_Enchanting + "\n"
    )

    message.reply(playerInfoEmbed).then(msg => {msg.delete(20000)});
  }

}