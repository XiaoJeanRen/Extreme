const inv = require("../players_inventory.json");
const fs = require("fs");
const all_item = require("../all_item_id_data.json");
const defaultItem = require("../default_item_data.json");


module.exports = {
    item_to_inv: function (playerID) {
        console.log("寫入玩家ID:"+playerID)
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
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
    },

    isEquipDrop: function () {
        let Successful_Value = 10; //成功掉落率
        let Total_Value = 20; //總值
        let isEquipDrop = Math.floor(Math.random() * Total_Value) + 1;
        if (isEquipDrop <= Successful_Value) {
            return true;
        }
    },

    Equip_Random_Type: function () {
        //隨機掉落部位
        /**
         * 1  => 武器
         * 2  => 頭盔
         * 3  => 護甲
         * 4  => 護腿
         * 5  => 手套
         * 6  => 鞋子
         * 7  => 戒指
         * 8  => 項鍊
         * 9  => 箭袋
         * 10 => 盾牌
         */
        let Random_Type = Math.floor(Math.random() * 2) + 1;
        console.log(Random_Type)
        switch (Random_Type) {
            case 1:
                return "武器"
            case 2:
                return "盾牌"
            case 3:
                return "護甲"
            case 4:
                return "護腿"
            case 5:
                return "手套"
            case 6:
                return "鞋子"
            case 7:
                return "戒指"
            case 8:
                return "項鍊"
            case 9:
                return "頭盔"
            case 10:
                return "箭袋"
            default:
                console.log("錯誤")
                break;
        }

    },

    Equip_Random_Item: function (Equip_Type, Monster_Level) {
        let Random_Equip = Math.floor(Math.random() * Monster_Level) + 1;
        if (Equip_Type == "武器") {
            switch (Random_Equip) {
                case 1:
                    return "銅劍"
                case 2:
                    return "鐵劍"
                default:
                    return "無"
            }
        } else if (Equip_Type == "盾牌") {
            switch (Random_Equip) {
                case 1:
                    return "銅盾"
                case 2:
                    return "鐵盾"
                default:
                    return "無"
            }
        } else {
            console.log("錯誤")
        }
    },

    get_Equip: function(playerID, ItemName){
        if (ItemName == "無") {
            return "無"
        } else {
            console.log("送入玩家ID:" + playerID)
            this.item_to_inv(playerID)
            all_item[all_item["總資料"].number] = defaultItem[ItemName];
            all_item[all_item["總資料"].number].Item_ID = all_item["總資料"].number;

            all_item["總資料"].number += 1;
            
            fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) => {});
        }
    },

    Test_Equip: function (playerID, Monster_Level) {
        console.log("使用對象：" + playerID)
        //決定是否掉落
        /*if (this.isEquipDrop()) {


        } else {
            
            return "無"
        }*/

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
                console.log(Monster_Level)
                console.log("裝備掉落成功")
                let Equip_Type = this.Equip_Random_Type();
                console.log("裝備掉落類型：" + Equip_Type)
                let ItemName = this.Equip_Random_Item(Equip_Type, Monster_Level)
                console.log("掉落裝備為：" + ItemName)
                this.get_Equip(playerID, ItemName);
                return ItemName
            default:
                console.log("裝備掉落失敗")
                return "無";
        }

    }

}