const inv = require("../players_inventory.json");
const all_item = require("../all_item_id_data.json");
const adv_time = require("../players_adventure_time.json");
/**
 * qualityCheck 檢查裝備品質
 * 傳奇(legendary): 1  史詩(epic): 2~5 稀有(rare): 6~50 魔法(magic): 51~200
 * 傳奇基值 +20 史詩基值 +10 稀有基值 +5 魔法基值+2 普通基值+0
 */
module.exports = {
    qualityCheck: function () {
        let quality = Math.floor(Math.random() * 1000) + 1;
        if (quality == 1) {
            return "傳奇";
        } else if (quality > 1 && quality <= 5) {
            return "史詩";
        } else if (quality > 5 && quality <= 50) {
            return "稀有";
        } else if (quality > 50 && quality <= 200) {
            return "魔法";
        } else {
            return "普通";
        }
    },

    powerCheck: function (quality) {
        switch (quality) {
            case '傳奇':
                return 20;
            case '史詩':
                return 10;
            case '稀有':
                return 5;
            case '魔法':
                return 2;
            default:
                return 0;
        }
    },

    item_to_inv: function (playerID) {
        let get_item_to_player_inv = inv[playerID];
        let dropitem_id = `${all_item["總資料"].number}`;
        if (get_item_to_player_inv.inv_1.itemID == "000") {
            get_item_to_player_inv.inv_1 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_2.itemID == "000") {
            get_item_to_player_inv.inv_2 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_3.itemID == "000") {
            get_item_to_player_inv.inv_3 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_4.itemID == "000") {
            get_item_to_player_inv.inv_4 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_5.itemID == "000") {
            get_item_to_player_inv.inv_5 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_6.itemID == "000") {
            get_item_to_player_inv.inv_6 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_7.itemID == "000") {
            get_item_to_player_inv.inv_7 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_8.itemID == "000") {
            get_item_to_player_inv.inv_8 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_9.itemID == "000") {
            get_item_to_player_inv.inv_9 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.inv_10.itemID == "000") {
            get_item_to_player_inv.inv_10 = {
                itemID: dropitem_id
            }
        } else {

        }
    },

    get_lootItem: function (playerID) {
        let quality = this.qualityCheck();
        let powerUp = this.powerCheck(quality);
        console.log("裝備稀有:" + quality)
        console.log("裝備強化度:" + powerUp)
        let choose_map = adv_time[playerID].adventure_id;
        if (choose_map == "001") { //副本代號 001
            lootItem_number = Math.floor(Math.random() * 2) + 1;
            console.log("取得裝備號碼:" + lootItem_number)
            switch (lootItem_number) {
                case 1:
                    all_item[all_item["總資料"].number] = {
                        Item_ID: all_item["總資料"].number,
                        Item_Type: "裝備",
                        Equip_Name: "銅劍",
                        Equip_Type: "武器",
                        Equip_Shape: "單手劍",
                        Equip_Identification: "已鑑定",
                        Equip_Quality: quality,
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
                    all_item["總資料"].number += 1;
                    return "銅劍";
                case 2:
                    all_item[all_item["總資料"].number] = {
                        Item_ID: all_item["總資料"].number,
                        Item_Type: "裝備",
                        Equip_Name: "銅劍",
                        Equip_Type: "武器",
                        Equip_Shape: "單手劍",
                        Equip_Identification: "已鑑定",
                        Equip_Quality: quality,
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
                    all_item["總資料"].number += 1;
                    return "銅劍";
                default:
                    break;
            }
        } else if (choose_map == "002") { //副本代號 002
            lootItem_number = Math.floor(Math.random() * 2) + 1;
            console.log("取得裝備號碼:" + lootItem_number)
            switch (lootItem_number) {
                case 1:
                    all_item[all_item["總資料"].number] = {
                        Item_ID: all_item["總資料"].number,
                        Item_Type: "裝備",
                        Equip_Name: "銅劍",
                        Equip_Type: "武器",
                        Equip_Shape: "單手劍",
                        Equip_Identification: "已鑑定",
                        Equip_Quality: quality,
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
                    all_item["總資料"].number += 1;
                    return "銅劍";
                case 2:
                    all_item[all_item["總資料"].number] = {
                        Item_ID: all_item["總資料"].number,
                        Item_Type: "裝備",
                        Equip_Name: "銅劍",
                        Equip_Type: "武器",
                        Equip_Shape: "單手劍",
                        Equip_Identification: "已鑑定",
                        Equip_Quality: quality,
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
                    all_item["總資料"].number += 1;
                    return "銅劍";
                default:
                    break;
            }
        }

    },

    lootItem: function (playerID) {
        islootItem = Math.floor(Math.random() * 10) + 1;
        console.log("取得裝備是否:" + islootItem)
        switch (islootItem) {
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                this.item_to_inv(playerID);
                return this.get_lootItem(playerID);
            default:
                return "無";
        }
    }


}