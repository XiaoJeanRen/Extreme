const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const CreateItem = require("../default_item_data.json");

module.exports = class create_item {
    constructor() {
        this.name = 'createI',
            this.alias = ['創造物品','ci'],
            this.usage = '!createI'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });

        if (!args[1]) return message.reply("指令錯誤，指令格式為!ci 物品名稱").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        let ItemName = args[1]
        CreateItem[ItemName] = {
            Item_ID: 0,
            Item_Type: "裝備",
            Equip_Name: ItemName,
            Equip_Type: "武器",
            Equip_Shape: "單手劍",
            Equip_Identification: "已鑑定",
            Equip_Quality: "無",
            Equip_Value: 0,
            Equip_Strengthen: 0,
            Equip_Info: "無",
            Equip_Add_MaxHP: 10,
            Equip_Add_MaxMP: 10,
            Equip_Add_MaxAP: 10,
            Equip_Add_MaxWeight: 5,
            Equip_Extra_Material: 0,
            Equip_Extra_Money: 0,
            Equip_Extra_Exp: 0,
            Equip_Extra_Status1: 0,
            Equip_Extra_Status2: 0,
            Equip_Extra_Status3: 0,
            Equip_Extra_Enchanting_Value: 0,
            Equip_Add_Str: 3,
            Equip_Add_Int: 3,
            Equip_Add_Dex: 3,
            Equip_Add_Acc: 1,
            Equip_Add_DMG: 1,
            Equip_Add_DEF: 1,
            Equip_Add_M_DMG: 0,
            Equip_Add_M_Def: 1,
            Equip_Add_Strike: 1,
            Equip_Add_Accurate: 1,
            Equip_Add_Taunt: 0,
            Equip_Add_HIT_DMG: 0,
            Equip_Add_HIT_DEF: 0,
            Equip_Add_CUT_DMG: 0,
            Equip_Add_CUT_DEF: 0,
            Equip_Add_POKE_DMG: 0,
            Equip_Add_POKE_DEF: 0,
            Equip_Add_COLD_DMG: 0,
            Equip_Add_COLD_DEF: 0,
            Equip_Add_FIRE_DMG: 0,
            Equip_Add_FIRE_DEF: 0,
            Equip_Add_WOOD_DMG: 0,
            Equip_Add_WOOD_DEF: 0,
            Equip_Add_LIGHT_DMG: 0,
            Equip_Add_LIGHT_DEF: 0,
            Equip_Add_BRIGHT_DMG: 0,
            Equip_Add_BRIGHT_DEF: 0,
            Equip_Add_DARK_DMG: 0,
            Equip_Add_DARK_DEF: 0,
            Equip_Add_POISON_DMG: 0,
            Equip_Add_POISON_DEF: 0,
            Equip_Need_Level: 1,
            Equip_Need_Weight: 1,
            Equip_Need_Class: 1,
            Equip_Need_Str: 0,
            Equip_Need_Int: 0,
            Equip_Need_Dex: 0,
            Equip_Need_Skill1: "無",
            Equip_Need_Skill2: "無",
            Equip_Need_Skill3: "無",
            Equip_Enchanting1: "無",
            Equip_Enchanting2: "無",
            Equip_Enchanting3: "無",
            Equip_Enchanting4: "無",
            Equip_Enchanting5: "無",
            Equip_Enchanting6: "無",
            Equip_Special_Power1: "無",
            Equip_Special_Power2: "無",
            Equip_Special_Power3: "無",
        }
        console.log(`使用者(ID: ${playerID})使用「創造物品」`)
        message.reply(`物品名稱「${ItemName}」創建完成.`).then(msg => {
            msg.delete(5000)
        });
        fs.writeFile("./default_item_data.json", JSON.stringify(CreateItem), (err) => {});
    }
}