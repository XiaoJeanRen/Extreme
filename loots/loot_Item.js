const inv = require("../players_inventory.json");
const all_item = require("../all_item_id_data.json");
const adv_time = require("../players_adventure_time.json");
/**
 * qualityCheck 檢查裝備品質
 * 傳奇(legendary): 1  史詩(epic): 2~5 稀有(rare): 6~50 魔法(magic): 51~200
 */
module.exports = {
    qualityCheck: function (){
        let quality = Math.floor(Math.random() * 1000) + 1;
        if(quality == 1){
            return "傳奇";
        }else if(quality > 1 && quality <= 5){
            return "史詩";
        }else if(quality > 5 && quality <= 50){
            return "稀有";
        }else if(quality > 50 && quality <= 200){
            return "魔法";
        }else{
            return "普通";
        }
    },

    powerCheck: function(quality){
        switch(quality){
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
        if (get_item_to_player_inv.default_inv.inv_1.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_1 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_2.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_2 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_3.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_3 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_4.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_4 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_5.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_5 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_6.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_6 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_7.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_7 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_8.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_8 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_9.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_9 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.default_inv.inv_10.itemID == "000") {
            get_item_to_player_inv.default_inv.inv_10 = {
                itemID: dropitem_id
            }
        } else {
            return message.reply("此玩家背包已滿.").then(msg => {
                msg.delete(1000)
            });
        }
    },

    get_lootItem: function (playerID) {
        let quality = this.qualityCheck();
        let powerUp = this.powerCheck(quality);
        console.log("裝備稀有:"+quality)
        console.log("裝備強化度:"+powerUp)
        let choose_map = adv_time[playerID].adventure_id;
        if (choose_map == "001") {      //副本代號 001
            lootItem_number = Math.floor(Math.random() * 2) + 1;
            console.log("取得裝備號碼:" + lootItem_number)
            switch (lootItem_number) {
                case 1:
                    all_item[all_item["總資料"].number] = {
                        item_Id: all_item["總資料"].number,
                        item_Type: "裝備",
                        equip_Name: "新手木劍",
                        equip_Type: "武器",
                        quality: quality,
                        strengthen: 0,
                        Identification: "已鑑定",
                        add_max_Hp: 0,
                        add_max_Mp: 0,
                        add_max_Ap: 0,
                        add_max_Weight: 0,
                        add_atk: 10 + powerUp,
                        add_def: 0,
                        needLevel: 1,
                        needClass: "無",
                        needWeight: 1,
                        special: "無",
                        itemInfo: "一把普通的木劍",
                        itemValue: 0,
                        itemSpecialId: 1
                    }
                    all_item["總資料"].number += 1;
                    return "新手木劍";
                case 2:
                    all_item[all_item["總資料"].number] = {
                        item_Id: all_item["總資料"].number,
                        item_Type: "裝備",
                        equip_Name: "新手木盾",
                        equip_Type: "盾牌",
                        quality: quality,
                        strengthen: 0,
                        Identification: "已鑑定",
                        add_max_Hp: 10,
                        add_max_Mp: 0,
                        add_max_Ap: 0,
                        add_max_Weight: 0,
                        add_atk: 0,
                        add_def: 10 + powerUp,
                        needLevel: 1,
                        needClass: "無",
                        needWeight: 1,
                        special: "無",
                        itemInfo: "小村莊常有的普通盾牌",
                        itemValue: 0,
                        itemSpecialId: 1
                    }
                    all_item["總資料"].number += 1;
                    return "新手木盾";
                default:
                    break;
            }
        }else if(choose_map == "002"){  //副本代號 002
            lootItem_number = Math.floor(Math.random() * 2) + 1;
            console.log("取得裝備號碼:" + lootItem_number)
            switch (lootItem_number) {
                case 1:
                    all_item[all_item["總資料"].number] = {
                        item_Id: all_item["總資料"].number,
                        item_Type: "裝備",
                        equip_Name: "銅劍",
                        equip_Type: "武器",
                        quality: quality,
                        strengthen: 0,
                        Identification: "已鑑定",
                        add_max_Hp: 0,
                        add_max_Mp: 0,
                        add_max_Ap: 0,
                        add_max_Weight: 0,
                        add_atk: 10 + powerUp,
                        add_def: 0,
                        needLevel: 1,
                        needClass: "無",
                        needWeight: 1,
                        special: "無",
                        itemInfo: "最經濟實惠的銅劍",
                        itemValue: 0,
                        itemSpecialId: 1
                    }
                    all_item["總資料"].number += 1;
                    return "銅劍";
                case 2:
                    all_item[all_item["總資料"].number] = {
                        item_Id: all_item["總資料"].number,
                        item_Type: "裝備",
                        equip_Name: "銅盾",
                        equip_Type: "盾牌",
                        quality: quality,
                        strengthen: 0,
                        Identification: "已鑑定",
                        add_max_Hp: 10,
                        add_max_Mp: 0,
                        add_max_Ap: 0,
                        add_max_Weight: 0,
                        add_atk: 0,
                        add_def: 10 + powerUp,
                        needLevel: 1,
                        needClass: "無",
                        needWeight: 1,
                        special: "無",
                        itemInfo: "最經濟實惠的銅盾",
                        itemValue: 0,
                        itemSpecialId: 1
                    }
                    all_item["總資料"].number += 1;
                    return "銅盾";
                default:
                    break;
            }
        }

    },

    lootItem: function (playerID) {
        islootItem = Math.floor(Math.random() * 10) + 1;
        console.log("取得裝備是否:" + islootItem)
        switch (islootItem) {
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