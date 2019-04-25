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
    .setAuthor(info.Equip_Name)
    .addField("**裝備資料**",
    "**物品ID(Item_ID)： **"                + info.Item_ID + "\n" +
    "**物品類型(Item_Type)： **"            + info.Item_Type + "\n" +
    "**裝備名稱(Equip_Name)： **"           + info.Equip_Name + "\n" +
    "**裝備類型(Equip_Type)： **"           + info.Equip_Type + "\n" +
    "**裝備屬性(Equip_Shape)： **"          + info.Equip_Shape + "\n" +
    "**裝備品質(Equip_Quality)： **"              + info.Equip_Quality + "\n" +
    "**裝備強化度(Equip_Strengthen)： **"         + info.Equip_Strengthen + "\n" +
    "**裝備鑑定(Equip_Identification)： **"       + info.Equip_Identification + "\n" +
    "**特殊能力1(Equip_Special_Power1)： **"              + info.Equip_Special_Power1 + "\n" +
    "**特殊能力2(Equip_Special_Power2)： **"              + info.Equip_Special_Power2 + "\n" +
    "**特殊能力3(Equip_Special_Power3)： **"              + info.Equip_Special_Power3 + "\n" +
    "**物品價值(Equip_Value)： **"            + info.Equip_Value + "\n" +
    "**物品介紹(Equip_Info)： **"             + info.Equip_Info + "\n"
    )
    .addField("**裝備需求屬性**",
    "**需求等級(Equip_Need_Level)： **"            + info.Equip_Need_Level + "\n" +
    "**需求職業(Equip_Need_Class)： **"            + info.Equip_Need_Class + "\n" +
    "**需求負重(Equip_Need_Weight)： **"           + info.Equip_Need_Weight + "\n" +
    "**需求力量(Equip_Need_Str)： **"              + info.Equip_Need_Str + "\n" +
    "**需求智慧(Equip_Need_Int)： **"              + info.Equip_Need_Int + "\n" +
    "**需求敏捷(Equip_Need_Dex)： **"              + info.Equip_Need_Dex + "\n" +
    "**需求技能1(Equip_Need_Skill1)： **"              + info.Equip_Need_Skill1 + "\n" +
    "**需求技能2(Equip_Need_Skill2)： **"              + info.Equip_Need_Skill2 + "\n" +
    "**需求技能3(Equip_Need_Skill3)： **"              + info.Equip_Need_Skill3 + "\n" 
    )
    .addField("**裝備增加屬性**",
    "**增加血量(Equip_Add_MaxHP)： **"           + info.Equip_Add_MaxHP + "\n" +
    "**增加魔力(Equip_Add_MaxMP)： **"           + info.Equip_Add_MaxMP + "\n" +
    "**增加行動點數(Equip_Add_MaxAP)： **"       + info.Equip_Add_MaxAP + "\n" +
    "**增加力量(Equip_Add_Str)： **"              + info.Equip_Add_Str + "\n" +
    "**增加智慧(Equip_Add_Int)： **"              + info.Equip_Add_Int + "\n" +
    "**增加敏捷(Equip_Add_Dex)： **"              + info.Equip_Add_Dex + "\n" +
    "**增加命中(Equip_Add_Acc)： **"              + info.Equip_Add_Acc + "\n" +
    "**增加命中率(Equip_Add_Accurate)： **"              + info.Equip_Add_Accurate + "\n" +
    "**增加爆擊率(Equip_Add_Strike)： **"              + info.Equip_Add_Strike + "\n" +
    "**增加仇恨(Equip_Add_Taunt)： **"              + info.Equip_Add_Taunt + "\n" +
    "**增加最大負重(Equip_Add_MaxWeight)： **"       + info.Equip_Add_MaxWeight + "\n"
    )
    .addField("**裝備攻擊屬性**",
    "**增加物理攻擊力(Equip_Add_DMG)： **"            + info.Equip_Add_DMG + "\n" +
    "**增加魔法攻擊力(Equip_Add_M_DMG)： **"            + info.Equip_Add_M_DMG + "\n" +
    "**增加火傷害(Equip_Add_FIRE_DMG)： **"     + info.Equip_Add_FIRE_DMG + "\n" +
    "**增加冰傷害(Equip_Add_COLD_DMG)： **"     + info.Equip_Add_COLD_DMG + "\n" +
    "**增加木傷害(Equip_Add_WOOD_DMG)： **"     + info.Equip_Add_WOOD_DMG + "\n" +
    "**增加電傷害(Equip_Add_LIGHT_DMG)： **"    + info.Equip_Add_LIGHT_DMG + "\n" +
    "**增加光傷害(Equip_Add_BRIGHT_DMG)： **"    + info.Equip_Add_BRIGHT_DMG + "\n" +
    "**增加暗傷害(Equip_Add_DARK_DMG)： **"    + info.Equip_Add_DARK_DMG + "\n" +
    "**增加毒傷害(Equip_Add_POISON_DMG)： **"    + info.Equip_Add_POISON_DMG + "\n" 
    )
    .addField("**裝備防禦屬性**",
    "**增加物理防禦力(Equip_Add_DEF)： **"            + info.Equip_Add_DEF + "\n" +
    "**增加魔法防禦力(Equip_Add_M_Def)： **"            + info.Equip_Add_M_Def + "\n" +
    "**增加火焰抗性(Equip_Add_FIRE_DEF)： **"     + info.Equip_Add_FIRE_DEF + "\n" +
    "**增加冰冷抗性(Equip_Add_COLD_DEF)： **"     + info.Equip_Add_COLD_DEF + "\n" +
    "**增加木抗性(Equip_Add_WOOD_DEF)： **"    + info.Equip_Add_WOOD_DEF + "\n" +
    "**增加電抗性(Equip_Add_LIGHT_DEF)： **"    + info.Equip_Add_LIGHT_DEF + "\n" +
    "**增加光抗性(Equip_Add_BRIGHT_DEF)： **"    + info.Equip_Add_BRIGHT_DEF + "\n" +
    "**增加暗抗性(Equip_Add_DARK_DEF)： **"    + info.Equip_Add_DARK_DEF + "\n" +
    "**增加毒抗性(Equip_Add_POISON_DEF)： **"    + info.Equip_Add_POISON_DEF + "\n" 
    )
    .addField("**裝備額外屬性**",
    "**額外素材掉落率(one_Enchanting)： **"   + info.Equip_Extra_Material + "\n" +
    "**額外金錢掉落(second_Enchanting)： **"+ info.Equip_Extra_Money + "\n" +
    "**額外經驗值(third_Enchanting)： **" + info.Equip_Extra_Exp + "\n" +
    "**額外特殊效果1(Equip_Special_Power1)： **"+ info.Equip_Special_Power1 + "\n" +
    "**額外特殊效果2(Equip_Special_Power2)： **"+ info.Equip_Special_Power2 + "\n" +
    "**額外特殊效果3(Equip_Special_Power3)： **"+ info.Equip_Special_Power3 + "\n" 
    )
    .addField("**裝備附魔**",
    "**第一附魔詞墜(Equip_Enchanting1)： **"   + info.Equip_Enchanting1 + "\n" +
    "**第二附魔詞墜(Equip_Enchanting2)： **"+ info.Equip_Enchanting2 + "\n" +
    "**第三附魔詞墜(Equip_Enchanting3)： **" + info.Equip_Enchanting3 + "\n" +
    "**第四附魔詞墜(Equip_Enchanting4)： **" + info.Equip_Enchanting4 + "\n" +
    "**第五附魔詞墜(Equip_Enchanting5)： **" + info.Equip_Enchanting5 + "\n" +
    "**第六附魔詞墜(Equip_Enchanting6)： **" + info.Equip_Enchanting6 + "\n" 
    )

    message.reply(playerInfoEmbed).then(msg => {msg.delete(20000)});
  }

}