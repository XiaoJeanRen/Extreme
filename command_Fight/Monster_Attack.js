const userData = require("../players_data.json");
module.exports = {
    Random_Damage: function () {
        return Math.floor(Math.random() * 10) + 1;
    },

    Monster_isCanAttack: function(Party_Info){

        if(Party_Info.Party_Attack_Turn == Party_Info.Monster_Attack_Turn){
            Party_Info.Party_Attack_Turn = 0;
            return true
        }
    },

    Monster_Attribute: function (Party_Info) {

        let Monster_Target = userData[Party_Info.Monster_Target]; //仇恨對象ID
        let Monster_AttributeType = Party_Info.Monster_Strength;
        let Monster_Att_Damage = 0;
        console.log("魔物屬性= " + Monster_AttributeType);
        if (Monster_AttributeType == "火"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_FIRE_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "水"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_COLD_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "木"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_WOOD_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "雷"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_LIGHT_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "光"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_BRIGHT_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "暗"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_DARK_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "斬"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_CUT_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "打"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_HIT_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "刺"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_POKE_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else if (Monster_AttributeType == "毒"){
            Monster_Att_Damage = Party_Info.Monster_Atk - Monster_Target.Character_POISON_DEF;
            if(Monster_Att_Damage <= 0){
                Monster_Att_Damage = 1
            }
            return Monster_Att_Damage
        }else{
            return 1
        }

    },

    Monster_Level_Difference_Check: function (Party_Info) {
        let Monster_Target = Party_Info.Monster_Target; //仇恨對象ID
        let Monster_AND_Player_Level_Difference = Party_Info.Monster_Actually_Level - userData[Monster_Target].Character_Level;

        console.log("怪物與玩家等差: " + Monster_AND_Player_Level_Difference)
        if (Monster_AND_Player_Level_Difference >= 10) {
            console.log("魔物基礎傷害10*等差")
            return 10 * Monster_AND_Player_Level_Difference;
        } else if (Monster_AND_Player_Level_Difference >= 5 && Monster_AND_Player_Level_Difference < 10) {
            console.log("魔物基礎傷害5*等差")
            return 5 * Monster_AND_Player_Level_Difference;
        } else {
            console.log("魔物基礎傷害20")
            return 20;
        }
    },

    Monster_Damage: function (Party_Info) {
        let Monster_Base_Damage = this.Monster_Level_Difference_Check(Party_Info) + this.Random_Damage();
        let Monster_Attribute_Damage = this.Monster_Attribute(Party_Info);
        let Monster_Total_Damage =  Monster_Base_Damage + Monster_Attribute_Damage;
        return Monster_Total_Damage
    }
}