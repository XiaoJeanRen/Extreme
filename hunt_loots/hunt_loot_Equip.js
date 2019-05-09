const inv = require("../players_inventory.json");
const fs = require("fs");
const all_item = require("../all_item_id_data.json");
const defaultItem = require("../default_item_data.json");


module.exports = {
    item_to_inv: function (playerID) {
        console.log("寫入玩家ID:" + playerID)
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
        let Random_Type = Math.floor(Math.random() * 7) + 1;
        console.log(Random_Type)
        switch (Random_Type) {
            case 1:
                return "武器"
            case 2:
                return "盾牌"
            case 3:
                return "頭盔"
            case 4:
                return "護甲"
            case 5:
                return "護腿"
            case 6:
                return "手套"
            case 7:
                return "鞋子"
            case 8:
                return "戒指"
            case 9:
                return "項鍊"
            case 10:
                return "箭袋"
            default:
                console.log("錯誤")
                break;
        }

    },

    Equip_Random_Item: function (Equip_Type, Monster_Level) {

        let Random_Equip = Math.floor(Math.random() * Monster_Level) + 1; //等級掉落
        console.log("等級掉落：" + Random_Equip)
        if (Equip_Type == "武器") {
            let Weapon_Random_Shape = Math.floor(Math.random() * 4) + 1; //單手劍、刀、杖等等
            if (Weapon_Random_Shape == 1) { // 單手劍
                if (Random_Equip <= 1) {
                    return "生鏽的劍";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅短劍";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "闊劍";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "變種劍";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "墨紅之劍";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "碧藍之劍";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "無音之劍";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "穿風之劍";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "虛罪之劍";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑劍";
                } else {
                    console.log("錯誤")
                }
            } else if (Weapon_Random_Shape == 2) { //單手刀
                if (Random_Equip <= 1) {
                    return "生鏽的刀";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅短刀";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "硬刀";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "變種刀";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "硬殼之刀";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "窺探之刀";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "無目之刀";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "斬風之刀";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "虛空之刀";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑刀";
                } else {
                    console.log("錯誤")
                }
            } else if (Weapon_Random_Shape == 3) { //單手鈍器
                if (Random_Equip <= 1) {
                    return "生鏽的鐵鎚";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅錘";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "堅韌錘";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "變種錘";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "卡特之錘";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "以拉之錘";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "無眉之錘";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "抑風之錘";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "虛影之錘";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑錘";
                } else {
                    console.log("錯誤")
                }
            } else if (Weapon_Random_Shape == 4) { //杖
                if (Random_Equip <= 1) {
                    return "海港樹枝";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "萌芽木枝";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "藤蔓之杖";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "茂盛之杖";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "知音之杖";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "血肉之杖";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "凝視之杖";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "掌心之杖";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "神木之杖";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑木之杖";
                } else {
                    console.log("錯誤")
                }
            }
        } else if (Equip_Type == "盾牌") {
            if (Random_Equip <= 1) {
                return "簡易輕盾";
            } else if (Random_Equip > 1 && Random_Equip <= 5) {
                return "青銅盾牌";
            } else if (Random_Equip > 5 && Random_Equip <= 10) {
                return "重皮盾牌";
            } else if (Random_Equip > 10 && Random_Equip <= 15) {
                return "獅首盾牌";
            } else if (Random_Equip > 15 && Random_Equip <= 20) {
                return "玫瑰之盾";
            } else if (Random_Equip > 20 && Random_Equip <= 25) {
                return "人面之盾";
            } else if (Random_Equip > 25 && Random_Equip <= 30) {
                return "獻身之盾";
            } else if (Random_Equip > 30 && Random_Equip <= 35) {
                return "鴻毛之盾";
            } else if (Random_Equip > 35 && Random_Equip <= 40) {
                return "修羅之盾";
            } else if (Random_Equip > 40 && Random_Equip <= 45) {
                return "黑鐵盾牌";
            } else {
                console.log("錯誤")
            }
        } else if (Equip_Type == "頭盔") {
            let Head_Random_Shape = Math.floor(Math.random() * 4) + 1; //板、鏈、皮、布
            if (Head_Random_Shape == 1) { // 板盔
                if (Random_Equip <= 1) {
                    return "凹陷板盔";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅板盔";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "甲殼板盔";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "羊首板盔";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔板盔";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "十字板盔";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "詛咒板盔";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩板盔";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "魔角板盔";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵板盔";
                } else {
                    console.log("錯誤")
                }
            } else if (Head_Random_Shape == 2) { //鏈盔
                if (Random_Equip <= 1) {
                    return "碎裂鏈盔";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "雜鐵鏈盔";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "鐵製鏈盔";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "密集鏈盔";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔鏈盔";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "辭世鏈盔";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "滅術鏈盔";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩鏈盔";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "埋葬鏈盔";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵鏈盔";
                } else {
                    console.log("錯誤")
                }
            } else if (Head_Random_Shape == 3) { //皮盔
                if (Random_Equip <= 1) {
                    return "撕裂皮盔";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁皮盔";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "加重皮盔";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "月奇革盔";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔革盔";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白燕革盔";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天崩革盔";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩革盔";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "懷願革盔";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵革盔";
                } else {
                    console.log("錯誤")
                }
            } else if (Head_Random_Shape == 4) { //布帽
                if (Random_Equip <= 1) {
                    return "破布帽";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁布帽";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "滲血布帽";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "話下布帽";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "羽絨布帽";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白龍布帽";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天蠶布帽";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "虹光布帽";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "聖者布帽";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "夢話布帽";
                } else {
                    console.log("錯誤")
                }
            }
        } else if (Equip_Type == "護甲") {
            let Body_Random_Shape = Math.floor(Math.random() * 4) + 1; //板、鏈、皮、布
            if (Body_Random_Shape == 1) { // 板甲
                if (Random_Equip <= 1) {
                    return "凹陷板甲";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅板甲";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "甲殼板甲";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "羊首板甲";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔板甲";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "十字板甲";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "詛咒板甲";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩板甲";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "魔角板甲";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵板甲";
                } else {
                    console.log("錯誤")
                }
            } else if (Body_Random_Shape == 2) { //鏈甲
                if (Random_Equip <= 1) {
                    return "碎裂鏈甲";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "雜鐵鏈甲";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "鐵製鏈甲";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "密集鏈甲";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔鏈甲";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "辭世鏈甲";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "滅術鏈甲";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩鏈甲";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "埋葬鏈甲";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵鏈甲";
                } else {
                    console.log("錯誤")
                }
            } else if (Body_Random_Shape == 3) { //皮甲
                if (Random_Equip <= 1) {
                    return "撕裂皮甲";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁皮甲";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "加重皮甲";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "月奇革甲";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔革甲";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白燕革甲";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天崩革甲";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩革甲";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "懷願革甲";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵革甲";
                } else {
                    console.log("錯誤")
                }
            } else if (Body_Random_Shape == 4) { //布衣
                if (Random_Equip <= 1) {
                    return "破布衣";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁布衣";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "滲血布衣";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "話下布衣";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "羽絨布衣";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白龍布衣";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天蠶布衣";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "虹光布衣";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "聖者布衣";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "夢話布衣";
                } else {
                    console.log("錯誤")
                }
            }
        } else if (Equip_Type == "護腿") {
            let Leg_Random_Shape = Math.floor(Math.random() * 4) + 1; //板、鏈、皮、布
            if (Leg_Random_Shape == 1) { // 板腿
                if (Random_Equip <= 1) {
                    return "凹陷板腿";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅板腿";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "甲殼板腿";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "羊首板腿";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔板腿";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "十字板腿";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "詛咒板腿";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩板腿";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "魔角板腿";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵板腿";
                } else {
                    console.log("錯誤")
                }
            } else if (Leg_Random_Shape == 2) { //鏈腿
                if (Random_Equip <= 1) {
                    return "碎裂鏈腿";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "雜鐵鏈腿";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "鐵製鏈腿";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "密集鏈腿";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔鏈腿";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "辭世鏈腿";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "滅術鏈腿";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩鏈腿";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "埋葬鏈腿";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵鏈腿";
                } else {
                    console.log("錯誤")
                }
            } else if (Leg_Random_Shape == 3) { //皮腿
                if (Random_Equip <= 1) {
                    return "撕裂皮腿";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁皮腿";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "加重皮腿";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "月奇革腿";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔革腿";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白燕革腿";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天崩革腿";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩革腿";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "懷願革腿";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵革腿";
                } else {
                    console.log("錯誤")
                }
            } else if (Leg_Random_Shape == 4) { //布腿
                if (Random_Equip <= 1) {
                    return "破布腿";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁布腿";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "滲血布腿";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "話下布腿";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "羽絨布腿";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白龍布腿";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天蠶布腿";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "虹光布腿";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "聖者布腿";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "夢話布腿";
                } else {
                    console.log("錯誤")
                }
            }
        } else if (Equip_Type == "手套") {
            let Gloves_Random_Shape = Math.floor(Math.random() * 4) + 1; //板、鏈、皮、布
            if (Gloves_Random_Shape == 1) { // 板手套
                if (Random_Equip <= 1) {
                    return "凹陷板手套";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅板手套";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "甲殼板手套";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "羊首板手套";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔板手套";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "十字板手套";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "詛咒板手套";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩板手套";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "魔角板手套";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵板手套";
                } else {
                    console.log("錯誤")
                }
            } else if (Gloves_Random_Shape == 2) { //鏈手套
                if (Random_Equip <= 1) {
                    return "碎裂鏈手套";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "雜鐵鏈手套";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "鐵製鏈手套";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "密集鏈手套";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔鏈手套";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "辭世鏈手套";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "滅術鏈手套";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩鏈手套";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "埋葬鏈手套";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵鏈手套";
                } else {
                    console.log("錯誤")
                }
            } else if (Gloves_Random_Shape == 3) { //皮手套
                if (Random_Equip <= 1) {
                    return "撕裂皮手套";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁皮手套";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "加重皮手套";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "月奇革手套";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔革手套";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白燕革手套";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天崩革手套";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩革手套";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "懷願革手套";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵革手套";
                } else {
                    console.log("錯誤")
                }
            } else if (Gloves_Random_Shape == 4) { //布手套
                if (Random_Equip <= 1) {
                    return "破布手套";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁布手套";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "滲血布手套";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "話下布手套";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "羽絨布手套";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白龍布手套";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天蠶布手套";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "虹光布手套";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "聖者布手套";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "夢話布手套";
                } else {
                    console.log("錯誤")
                }
            }
        } else if (Equip_Type == "鞋子") {
            let Boots_Random_Shape = Math.floor(Math.random() * 4) + 1; //板、鏈、皮、布
            if (Boots_Random_Shape == 1) { // 板鞋
                if (Random_Equip <= 1) {
                    return "凹陷板鞋";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "青銅板鞋";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "甲殼板鞋";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "羊首板鞋";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔板鞋";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "十字板鞋";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "詛咒板鞋";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩板鞋";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "魔角板鞋";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵板鞋";
                } else {
                    console.log("錯誤")
                }
            } else if (Boots_Random_Shape == 2) { //鏈鞋
                if (Random_Equip <= 1) {
                    return "碎裂鏈鞋";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "雜鐵鏈鞋";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "鐵製鏈鞋";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "密集鏈鞋";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔鏈鞋";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "辭世鏈鞋";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "滅術鏈鞋";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩鏈鞋";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "埋葬鏈鞋";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵鏈鞋";
                } else {
                    console.log("錯誤")
                }
            } else if (Boots_Random_Shape == 3) { //皮鞋
                if (Random_Equip <= 1) {
                    return "撕裂皮鞋";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁皮鞋";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "加重皮鞋";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "月奇革鞋";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "滲魔革鞋";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白燕革鞋";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天崩革鞋";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "彩岩革鞋";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "懷願革鞋";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "黑鐵革鞋";
                } else {
                    console.log("錯誤")
                }
            } else if (Boots_Random_Shape == 4) { //布鞋
                if (Random_Equip <= 1) {
                    return "破布鞋";
                } else if (Random_Equip > 1 && Random_Equip <= 5) {
                    return "補丁布鞋";
                } else if (Random_Equip > 5 && Random_Equip <= 10) {
                    return "滲血布鞋";
                } else if (Random_Equip > 10 && Random_Equip <= 15) {
                    return "話下布鞋";
                } else if (Random_Equip > 15 && Random_Equip <= 20) {
                    return "羽絨布鞋";
                } else if (Random_Equip > 20 && Random_Equip <= 25) {
                    return "白龍布鞋";
                } else if (Random_Equip > 25 && Random_Equip <= 30) {
                    return "天蠶布鞋";
                } else if (Random_Equip > 30 && Random_Equip <= 35) {
                    return "虹光布鞋";
                } else if (Random_Equip > 35 && Random_Equip <= 40) {
                    return "聖者布鞋";
                } else if (Random_Equip > 40 && Random_Equip <= 45) {
                    return "夢話布鞋";
                } else {
                    console.log("錯誤")
                }
            }
        } else {
            console.log("錯誤")
        }
    },

    get_Equip: function (playerID, ItemName) {
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
        if (this.isEquipDrop()) {

            console.log("裝備掉落成功")
            let Equip_Type = this.Equip_Random_Type();
            console.log("裝備掉落類型：" + Equip_Type)
            let ItemName = this.Equip_Random_Item(Equip_Type, Monster_Level)
            console.log("掉落裝備為：" + ItemName)
            this.get_Equip(playerID, ItemName);
            return ItemName

        } else {
            console.log("裝備掉落失敗")
            return "無";
        }

    }

}