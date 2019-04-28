const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const player_equip = require("../character_equip.json");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");
//脫下裝備指令
module.exports = class wear_equip {
    constructor() {
        this.name = 'unwear',
            this.alias = ['脫下'],
            this.usage = '!unwear'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        let unwear = function (itemID) {
            userData[playerID].Character_MaxHP -= equip[itemID].Equip_Add_MaxHP;
            userData[playerID].Character_MaxMP -= equip[itemID].Equip_Add_MaxMP;
            userData[playerID].Character_MaxAP -= equip[itemID].Equip_Add_MaxAP;
            userData[playerID].Character_MaxWeight -= equip[itemID].Equip_Add_MaxWeight;

            userData[playerID].Character_Extra_Escape -= equip[itemID].Equip_Extra_Escape;
            userData[playerID].Character_Extra_Material -= equip[itemID].Equip_Extra_Material; //裝備增加HP
            userData[playerID].Character_Extra_Money -= equip[itemID].Equip_Extra_Money; //裝備增加MP
            userData[playerID].Character_Extra_Exp -= equip[itemID].Equip_Extra_Exp;

            userData[playerID].Character_Str -= equip[itemID].Equip_Add_Str;
            userData[playerID].Character_Int -= equip[itemID].Equip_Add_Int;
            userData[playerID].Character_Dex -= equip[itemID].Equip_Add_Dex;
            userData[playerID].Character_Acc -= equip[itemID].Equip_Add_Acc;

            userData[playerID].Character_DMG -= equip[itemID].Equip_Add_DMG;
            userData[playerID].Character_DEF -= equip[itemID].Equip_Add_DEF;

            userData[playerID].Character_Strike -= equip[itemID].Equip_Add_Strike;
            userData[playerID].Character_Accurate -= equip[itemID].Equip_Add_Accurate;
            userData[playerID].Character_Taunt -= equip[itemID].Equip_Add_Taunt;

            userData[playerID].Character_M_DMG -= equip[itemID].Equip_Add_M_DMG;
            userData[playerID].Character_M_Def -= equip[itemID].Equip_Add_M_Def;

            userData[playerID].Character_Weight -= equip[itemID].Equip_Need_Weight;

            //火
            userData[playerID].Character_FIRE_DMG -= equip[itemID].Equip_Add_FIRE_DMG;
            userData[playerID].Character_FIRE_DEF -= equip[itemID].Equip_Add_FIRE_DEF;

            //水
            userData[playerID].Character_COLD_DMG -= equip[itemID].Equip_Add_COLD_DMG;
            userData[playerID].Character_COLD_DEF -= equip[itemID].Equip_Add_COLD_DEF;

            //木
            userData[playerID].Character_WOOD_DMG -= equip[itemID].Equip_Add_WOOD_DMG;
            userData[playerID].Character_WOOD_DEF -= equip[itemID].Equip_Add_WOOD_DEF;

            //閃電
            userData[playerID].Character_LIGHT_DMG -= equip[itemID].Equip_Add_LIGHT_DMG;
            userData[playerID].Character_LIGHT_DEF -= equip[itemID].Equip_Add_LIGHT_DEF;

            //光明
            userData[playerID].Character_BRIGHT_DMG -= equip[itemID].Equip_Add_BRIGHT_DMG;
            userData[playerID].Character_BRIGHT_DEF -= equip[itemID].Equip_Add_BRIGHT_DEF;

            //黑暗
            userData[playerID].Character_DARK_DMG -= equip[itemID].Equip_Add_DARK_DMG;
            userData[playerID].Character_DARK_DEF -= equip[itemID].Equip_Add_DARK_DEF;

            //毒
            userData[playerID].Character_POISON_DMG -= equip[itemID].Equip_Add_POISON_DMG;
            userData[playerID].Character_POISON_DEF -= equip[itemID].Equip_Add_POISON_DEF;

            //打
            userData[playerID].Character_HIT_DMG -= equip[itemID].Equip_Add_HIT_DMG;
            userData[playerID].Character_HIT_DEF -= equip[itemID].Equip_Add_HIT_DEF;

            //斬
            userData[playerID].Character_CUT_DMG -= equip[itemID].Equip_Add_CUT_DMG;
            userData[playerID].Character_CUT_DEF -= equip[itemID].Equip_Add_CUT_DEF;

            //刺
            userData[playerID].Character_POKE_DMG -= equip[itemID].Equip_Add_POKE_DMG;
            userData[playerID].Character_POKE_DEF -= equip[itemID].Equip_Add_POKE_DEF;

            if (itemID == player_equip[playerID].Weapon1) {
                player_equip[playerID].Weapon1 = "000"
            } else if (itemID == player_equip[playerID].Weapon2) {
                player_equip[playerID].Weapon2 = "000"
            } else if (itemID == player_equip[playerID].Head) {
                player_equip[playerID].Head = "000"
            } else if (itemID == player_equip[playerID].Body) {
                player_equip[playerID].Body = "000"
            } else if (itemID == player_equip[playerID].Gloves) {
                player_equip[playerID].Gloves = "000"
            } else if (itemID == player_equip[playerID].Leg) {
                player_equip[playerID].Leg = "000"
            } else if (itemID == player_equip[playerID].Boots) {
                player_equip[playerID].Boots = "000"
            } else if (itemID == player_equip[playerID].Ring) {
                player_equip[playerID].Ring = "000"
            } else if (itemID == player_equip[playerID].Amulet) {
                player_equip[playerID].Amulet = "000"
            }
        }
        let myinv_info = inv[playerID];
        let my_equip = player_equip[playerID];
        let itemID = args[1];
        if (!itemID || itemID === "000") return message.reply("請輸入目前裝備中的裝備id.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「脫下」.`)
        if (itemID != my_equip.Weapon1 &&
            itemID != my_equip.Weapon2 &&
            itemID != my_equip.Arrowbag &&
            itemID != my_equip.Head &&
            itemID != my_equip.Body &&
            itemID != my_equip.Gloves &&
            itemID != my_equip.Leg &&
            itemID != my_equip.Boots &&
            itemID != my_equip.Ring &&
            itemID != my_equip.Amulet) {
            console.log(`使用者(ID: ${playerID})使用「脫下」失敗.`)
            return message.reply("你沒有穿戴此裝備，請再次確認.").then(msg => {
                msg.delete(5000)
            });
        } else {
            if (myinv_info.inv_1.itemID == "000") {
                myinv_info.inv_1 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_2.itemID == "000") {
                myinv_info.inv_2 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_3.itemID == "000") {
                myinv_info.inv_3 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_4.itemID == "000") {
                myinv_info.inv_4 = {
                    itemID: itemID
                }
            } else if (myinv_info.inv_5.itemID == "000") {
                myinv_info.inv_5 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_6.itemID == "000") {
                myinv_info.inv_6 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_7.itemID == "000") {
                myinv_info.inv_7 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_8.itemID == "000") {
                myinv_info.inv_8 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_9.itemID == "000") {
                myinv_info.inv_9 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else if (myinv_info.inv_10.itemID == "000") {
                myinv_info.inv_10 = {
                    itemID: itemID
                }
                unwear(itemID);
            } else {
                return message.reply("背包已滿，請整理後再次執行.").then(msg => {
                    msg.delete(1000)
                });
            }

        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
        fs.writeFile("./character_equip.json", JSON.stringify(player_equip), (err) => {});
        console.log(`使用者(ID: ${playerID})使用「脫下」成功.`)
        message.reply("裝備脫下成功.").then(msg => {
            msg.delete(1000)
        });
    }
}