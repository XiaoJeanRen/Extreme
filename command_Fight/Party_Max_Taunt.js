const userData = require("../players_data.json");
module.exports = {
    Party_Taunt_Check: function (Player_Info, Party_Info) {
        console.log("攻擊對象仇恨：" + Player_Info.Character_Taunt)
        console.log("目前對象仇恨：" + userData[Party_Info.Monster_Target].Character_Taunt)
        if (Player_Info.Character_Taunt > userData[Party_Info.Monster_Target].Character_Taunt) {
            return true;
        }

    },

    Cal_Taunt: function (Player_Info, Player_Total_Damge) {
        Player_Info.Character_Taunt += Math.floor((Player_Total_Damge / 2))
    }
}