const inv = require("../players_inventory.json");
const all_item = require("../all_item_id_data.json");
//const userData = require("../players_data.json");
module.exports = {
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

    get_lootItem: function () {
        lootItem_number = Math.floor(Math.random() * 2) + 1;
        console.log("取得裝備號碼:" + lootItem_number)
        switch (lootItem_number) {
            case 1:
                all_item[all_item["總資料"].number] = {
                    item_Id: all_item["總資料"].number,
                    item_Type: "裝備",
                    equip_Name: "新手木劍",
                    equip_Type: "武器",
                    quality: "普通",
                    add_max_Hp: 0,
                    add_max_Mp: 0,
                    add_max_Ap: 0,
                    add_max_Weight: 0,
                    add_atk: 10,
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
                    quality: "普通",
                    add_max_Hp: 10,
                    add_max_Mp: 0,
                    add_max_Ap: 0,
                    add_max_Weight: 0,
                    add_atk: 0,
                    add_def: 10,
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
    },

    lootItem: function (playerID){
        islootItem = Math.floor(Math.random() * 10) + 1;
        console.log("取得裝備是否:" + islootItem)
        switch (islootItem) {
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                this.item_to_inv(playerID);
                return this.get_lootItem();
            default:
                return "無";
        }
    }


}