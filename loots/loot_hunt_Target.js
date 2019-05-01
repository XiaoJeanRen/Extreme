const inv = require("../players_inventory.json");
const all_hunt = require("../all_hunts_id_data.json");
const userData = require("../players_data.json");
module.exports = {
    item_to_inv: function (playerID) {
        let get_item_to_player_inv = inv[playerID];
        let dropitem_id = "h" + `${all_hunt["總資料"].number}`;
        if (get_item_to_player_inv.invh_1.itemID == "000") {
            get_item_to_player_inv.invh_1 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.invh_2.itemID == "000") {
            get_item_to_player_inv.invh_2 = {
                itemID: dropitem_id
            }
        } else if (get_item_to_player_inv.invh_3.itemID == "000") {
            get_item_to_player_inv.invh_3 = {
                itemID: dropitem_id
            }
        }
    },

    LevelCheck: function () {
        let Level = Math.floor(Math.random() * 100) + 1;
        if (Level == 1) {
            return "傳奇"
        } else if (Level > 1 && Level <= 5) {
            return "史詩"
        } else if (Level > 5 && Level <= 15) {
            return "稀有"
        } else if (Level > 15 && Level <= 30) {
            return "魔法"
        } else {
            return "普通"
        }
    },

    RandomLevel: function(playerID){
        let PlayerLevel = userData[playerID].Character_Level;
        console.log("玩家等級：" + PlayerLevel)
        let RandomLevel = Math.floor(Math.random() * PlayerLevel) + 1;
        return RandomLevel
    },

    HPCheck: function (Target_Level) {
        let HP_Random = Math.floor(Math.random() * 2000) + 200;
        if (Target_Level == "傳奇") {
            return (10000 + HP_Random);
        } else if (Target_Level == "史詩") {
            return (5000 + HP_Random);
        } else if (Target_Level == "稀有") {
            return (2500 + HP_Random);
        } else if (Target_Level == "魔法") {
            return (1000 + HP_Random);
        } else {
            return (500 + HP_Random);
        }
    },

    Power_Check_HP: function (Target_HP) {
        if (Target_HP >= 10000) {
            return "災厄";
        } else if (Target_HP >= 5000 && Target_HP < 10000) {
            return "危險"
        } else if (Target_HP >= 2500 && Target_HP < 5000) {
            return "高級"
        } else if (Target_HP >= 1000 && Target_HP < 2500) {
            return "中級"
        } else {
            return "一般"
        }
    },

    AtkCheck: function (Target_Level) {
        let Atk_Random = Math.floor(Math.random() * 300) + 10;
        if (Target_Level == "傳奇") {
            return (500 + Atk_Random);
        } else if (Target_Level == "史詩") {
            return (300 + Atk_Random);
        } else if (Target_Level == "稀有") {
            return (150 + Atk_Random);
        } else if (Target_Level == "魔法") {
            return (100 + Atk_Random);
        } else {
            return (50 + Atk_Random);
        }
    },

    Power_Check_Atk: function (Target_Atk) {
        if (Target_Atk >= 500) {
            return "災厄";
        } else if (Target_Atk >= 300 && Target_Atk < 500) {
            return "危險"
        } else if (Target_Atk >= 150 && Target_Atk < 300) {
            return "高級"
        } else if (Target_Atk >= 100 && Target_Atk < 300) {
            return "中級"
        } else {
            return "一般"
        }
    },

    DefCheck: function (Target_Level) {
        let Def_Random = Math.floor(Math.random() * 300) + 10;
        if (Target_Level == "傳奇") {
            return (500 + Def_Random);
        } else if (Target_Level == "史詩") {
            return (300 + Def_Random);
        } else if (Target_Level == "稀有") {
            return (150 + Def_Random);
        } else if (Target_Level == "魔法") {
            return (100 + Def_Random);
        } else {
            return (50 + Def_Random);
        }
    },

    Power_Check_Def: function (Target_Def) {
        if (Target_Def >= 500) {
            return "災厄";
        } else if (Target_Def >= 300 && Target_Def < 500) {
            return "危險"
        } else if (Target_Def >= 150 && Target_Def < 300) {
            return "高級"
        } else if (Target_Def >= 100 && Target_Def < 300) {
            return "中級"
        } else {
            return "一般"
        }
    },

    Target_StrengthCheck: function () {
        let Strength_Random = Math.floor(Math.random() * 10) + 1;
        switch (Strength_Random) {
            case 1:
                return "打"
            case 2:
                return "刺"
            case 3:
                return "斬"
            case 4:
                return "火"
            case 5:
                return "水"
            case 6:
                return "木"
            case 7:
                return "雷"
            case 8:
                return "光"
            case 9:
                return "暗"
            case 10:
                return "毒"
            default:
                return "無"
        }
    },

    Target_WeekCheck: function () {
        let Week_Random = Math.floor(Math.random() * 10) + 1;
        switch (Week_Random) {
            case 1:
                return "打"
            case 2:
                return "刺"
            case 3:
                return "斬"
            case 4:
                return "火"
            case 5:
                return "水"
            case 6:
                return "木"
            case 7:
                return "雷"
            case 8:
                return "光"
            case 9:
                return "暗"
            case 10:
                return "毒"
            default:
                return "無"
        }
    },

    get_loot_Target: function (playerID) {
        let Target_Level = this.LevelCheck();
        let Target_Actually_Level = this.RandomLevel(playerID);

        let Target_HP = this.HPCheck(Target_Level);
        let Power_HP = this.Power_Check_HP(Target_HP);

        let Target_Atk = this.AtkCheck(Target_Level);
        let Power_Atk = this.Power_Check_Atk(Target_Atk);

        let Target_Def = this.DefCheck(Target_Level);
        let Power_Def = this.Power_Check_Def(Target_Def);

        let Target_Strength = this.Target_StrengthCheck();
        let Target_Week = this.Target_WeekCheck();
        console.log("取得授狩獵目標")
        all_hunt["h" + all_hunt["總資料"].number] = {
            Target_ID: "h" + all_hunt["總資料"].number,
            Target_Level: Target_Level,
            Target_Actually_Level: Target_Actually_Level,
            Target_HP: Target_HP,
            Power_HP: Power_HP,
            Target_Atk: Target_Atk,
            Power_Atk: Power_Atk,
            Target_Def: Target_Def,
            Power_Def: Power_Def,
            Target_Strength: Target_Strength,
            Target_Week: Target_Week,
            
        }
        all_hunt["總資料"].number += 1;
        return "狩獵目標";
    },

    loot_Target: function (playerID){
        let islootTarget = Math.floor(Math.random() * 20) + 1;
        console.log("是否取得狩獵目標:" + islootTarget)
        if (islootTarget <= 20){
            this.item_to_inv(playerID);
            return this.get_loot_Target(playerID)
        }else{
            return "無";
        }
    }
}