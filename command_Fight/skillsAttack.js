module.exports = {
    Random_Fight_Number: function () {
        return Math.floor(Math.random() * 100) + 1;
    },

    Random_Damage: function () {
        return Math.floor(Math.random() * 10) + 1;
    },

    isSkillMiss: function (Player_Info, Party_Info, Player_Skill_Info) {
        let Player_AND_Monster_Level_Difference = Player_Info.Character_Level - Party_Info.Monster_Actually_Level;
        console.log("等差:" + Player_AND_Monster_Level_Difference)
        if (Player_AND_Monster_Level_Difference >= 10) {
            console.log("比怪物大10等")
            let Player_Total_Accurate = 85 + Player_Info.Character_Accurate + Player_Skill_Info.Skill_Add_Accurate;
            console.log("玩家命中率：" + Player_Total_Accurate)
            if (this.Random_Fight_Number() < Player_Total_Accurate) {
                return true;
            } else {
                return false;
            }
        } else if (Player_AND_Monster_Level_Difference < 10 && Player_AND_Monster_Level_Difference > -5) {
            console.log("比怪物大或小5等")
            let Player_Total_Accurate = 70 + Player_Info.Character_Accurate + Player_Skill_Info.Skill_Add_Accurate;
            console.log("玩家命中率：" + Player_Total_Accurate)
            if (this.Random_Fight_Number() < Player_Total_Accurate) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log("比怪物小10等")
            let Player_Total_Accurate = 50 + Player_Info.Character_Accurate + Player_Skill_Info.Skill_Add_Accurate;
            console.log("玩家命中率：" + Player_Total_Accurate)
            if (this.Random_Fight_Number() < Player_Total_Accurate) {
                return true;
            } else {
                return false;
            }
        }
    },

    Damage_isZero: function(Player_Total_DMG){
        if (Player_Total_DMG <= 0){
            return true
        }
    },

    SkillAttack: function (Player_Info, Party_Info, Player_Skill_Info) {
        let Skill_Type = Player_Skill_Info.Skill_Type;
        console.log("使用技能屬性為: " + Skill_Type);
        let Monster_Def = Party_Info.Monster_Def; //魔物防禦
        let Skill_Attack_Damage = 1;
        if (Player_Skill_Info.Skill_Attack_Type == "物理") {
            Skill_Attack_Damage = Player_Info.Character_DMG;
        } else if (Player_Skill_Info.Skill_Attack_Type == "魔法") {
            Skill_Attack_Damage = Player_Info.Character_M_DMG;
        } else {
            Skill_Attack_Damage = 1;
        }

        if (Skill_Type == "刺" && Party_Info.Monster_Week == "刺") { //玩家攻擊屬性=刺 魔物弱點屬性=刺
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_POKE_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "斬" && Party_Info.Monster_Week == "斬") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_CUT_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "打" && Party_Info.Monster_Week == "打") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_HIT_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "火" && Party_Info.Monster_Week == "火") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_FIRE_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發火屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "水" && Party_Info.Monster_Week == "水") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_COLD_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發水屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "木" && Party_Info.Monster_Week == "木") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_WOOD_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發木屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "雷" && Party_Info.Monster_Week == "雷") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_LIGHT_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發雷屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "光" && Party_Info.Monster_Week == "光") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_BRIGHT_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發光屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "暗" && Party_Info.Monster_Week == "暗") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_WOOD_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發暗屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else if (Skill_Type == "毒" && Party_Info.Monster_Week == "毒") {
            let Player_Total_DMG = Math.floor((Skill_Attack_Damage + Player_Info.Character_WOOD_DMG) * 1.5) - Monster_Def;
            if(this.Damage_isZero(Player_Total_DMG)){
                Player_Total_DMG = 1;
            }
            console.log("觸發木屬弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG + this.Random_Damage()

        } else {
            let Player_Total_DMG = Skill_Attack_Damage + this.Random_Damage();
            console.log("未觸發任何屬性弱點攻擊，總傷害: " + Player_Total_DMG);
            return Player_Total_DMG 
        }

    }
}