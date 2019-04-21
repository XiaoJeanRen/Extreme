const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const equipData = require("../equip_ID_data.json");
/** 建立全新裝備的能力值
 * item_Id          物品Id
 * item_Type        物品類型
 * equip_Name       裝備名稱
 * equip_Type       裝備類型
 * max_Hp           血量上限
 * max_Mp           魔力上限
 * max_Ap           行動點數上限
 * max_Weight       重量上限
 * atk              攻擊力
 * def              防禦力
 * needlevel        需求等級
 * needClass        需求職業
 * needWeight       需求負重
 * special          特殊能力
 * itemInfo         裝備說明
 */
module.exports = class create_Equip {
    constructor() {
        this.name = 'GM_create_equip',
            this.alias = ['裝備創建'],
            this.usage = '!GM_create_equip'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「裝備創建」`)
        let itemID = args[1];
        let itemType = args[2];
        let equipName = args[3];
        let equipType = args[4];
        if (!itemID || !itemType || !equipName || !equipType) return message.reply("GM您好\n裝備創建格式：「!裝備創建 <itemID> <itemType> <equipName> <equipType>」");
        if (!equipData[itemID]) {
            equipData[itemID] = {
                item_Id: itemID,
                item_Type: itemType,
                equip_Name: equipName,
                equip_Type: equipType,
                add_max_Hp: 0,
                add_max_Mp: 0,
                add_max_Ap: 0,
                add_max_Weight: 0,
                add_atk: 0,
                add_def: 0,
                needLevel: 1,
                needClass: "無",
                needWeight: 0,
                special: "無",
                itemInfo: "無",
                itemValue: 0
            };
            fs.writeFile("./equip_ID_data.json", JSON.stringify(equipData), (err) => {

            });
            message.reply("物品創建完成").then(msg => {
                msg.delete(5000)
            });

        } else {
            return message.reply("物品ID已存在").then(msg => {
                msg.delete(1000)
            });
        }

    }

}