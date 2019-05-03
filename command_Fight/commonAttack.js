module.exports = {
    Random_Fight_Number: function () {
        return Math.floor(Math.random() * 100) + 1;
    },

    Random_Damage: function () {
        return Math.floor(Math.random() * 10) + 1;
    },

    isMiss: function (Player_Info, Party_Info) { //判斷是否命中
        let Player_AND_Monster_Level_Difference = Player_Info.Character_Level - Party_Info.Monster_Actually_Level;
        console.log("等差:" + Player_AND_Monster_Level_Difference)
        if (Player_AND_Monster_Level_Difference >= 10) {
            console.log("比怪物大10等")
            let Player_Total_Accurate = 85 + Player_Info.Character_Accurate;
            console.log("玩家命中率：" + Player_Total_Accurate)
            if (this.Random_Fight_Number() < Player_Total_Accurate) {
                return true;
            } else {
                return false;
            }
        } else if (Player_AND_Monster_Level_Difference < 10 && Player_AND_Monster_Level_Difference > -5) {
            console.log("比怪物大或小5等")
            let Player_Total_Accurate = 70 + Player_Info.Character_Accurate;
            console.log("玩家命中率：" + Player_Total_Accurate)
            if (this.Random_Fight_Number() < Player_Total_Accurate) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log("比怪物小10等")
            let Player_Total_Accurate = 50 + Player_Info.Character_Accurate;
            console.log("玩家命中率：" + Player_Total_Accurate)
            if (this.Random_Fight_Number() < Player_Total_Accurate) {
                return true;
            } else {
                return false;
            }
        }
    },

    Player_CommonAttack: function (Player_Info, Party_Info, Weapon_Type) {
        console.log("使用武器屬性為: " + Weapon_Type);
        if (Weapon_Type == "刺" && Party_Info.Monster_Week == "刺") { //玩家攻擊屬性=刺 魔物弱點屬性=刺
            let Player_Total_DMG = Math.floor((Player_Info.Character_DMG + Player_Info.Character_POKE_DMG) * 1.5);
            console.log("觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Weapon_Type == "斬" && Party_Info.Monster_Week == "斬") {
            let Player_Total_DMG = Math.floor((Player_Info.Character_DMG + Player_Info.Character_CUT_DMG) * 1.5);
            console.log("觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Weapon_Type == "打" && Party_Info.Monster_Week == "打") {
            let Player_Total_DMG = Math.floor((Player_Info.Character_DMG + Player_Info.Character_HIT_DMG) * 1.5);
            console.log("觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else {
            let Player_Total_DMG = Player_Info.Character_DMG;
            console.log("未觸發任何屬性弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()
        }
    },

    Player_Attack_Turn_Plus: function (Party_Info) {
        Party_Info.Party_Attack_Turn += 1;
        console.log("玩家回合增加")
    }
}