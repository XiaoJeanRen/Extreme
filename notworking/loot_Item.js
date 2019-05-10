const inv = require("../players_inventory.json");
const all_item = require("../all_item_id_data.json");
const adv_time = require("../players_adventure_time.json");
const defaultItem = require("../default_item_data.json");
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
                case 1: //銅劍
                    all_item[all_item["總資料"].number] = defaultItem["銅劍"];
                    all_item[all_item["總資料"].number].Item_ID = all_item["總資料"].number;
                    all_item[all_item["總資料"].number].Equip_Quality = quality;
                    all_item["總資料"].number += 1;
                    return "銅劍";
                case 2:
                    all_item[all_item["總資料"].number] = defaultItem["銅盾"];
                    all_item[all_item["總資料"].number].Item_ID = all_item["總資料"].number;
                    all_item[all_item["總資料"].number].Equip_Quality = quality;
                    all_item["總資料"].number += 1;
                    return "銅盾";
                default:
                    break;
            }
        } else if (choose_map == "002") { //副本代號 002
            lootItem_number = Math.floor(Math.random() * 2) + 1;
            console.log("取得裝備號碼:" + lootItem_number)
            switch (lootItem_number) {
                case 1:
                    all_item[all_item["總資料"].number] = defaultItem["鐵劍"];
                    all_item[all_item["總資料"].number].Item_ID = all_item["總資料"].number;
                    all_item[all_item["總資料"].number].Equip_Quality = quality;
                    all_item["總資料"].number += 1;
                    return "鐵劍";
                case 2:
                    all_item[all_item["總資料"].number] = defaultItem["鐵盾"];
                    all_item[all_item["總資料"].number].Item_ID = all_item["總資料"].number;
                    all_item[all_item["總資料"].number].Equip_Quality = quality;
                    all_item["總資料"].number += 1;
                    return "鐵盾";
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