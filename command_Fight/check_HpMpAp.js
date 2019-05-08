const userData = require("../players_data.json");
module.exports = {
    Player_NoHpMpAp: function (Player_Info,Player_Skill_Info) {
        
        if (Player_Skill_Info.Skill_Decrease_Hp > Player_Info.Character_HP ||
            Player_Skill_Info.Skill_Decrease_Mp > Player_Info.Character_MP ||
            Player_Skill_Info.Skill_Decrease_Ap > Player_Info.Character_AP
        ) {
            return true;
        }
    },
    Del_Monster_And_Player_Damage: function(Party_Info, Player_Total_Damge, Monster_Total_Damage){
        console.log(Player_Total_Damge)
        console.log(Monster_Total_Damage)
        Party_Info.Monster_HP -= Player_Total_Damge;
        userData[Party_Info.Monster_Target].Character_HP -= Monster_Total_Damage;
    }
}