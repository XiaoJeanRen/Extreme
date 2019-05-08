module.exports = {
    Skill_1004: function (Player_Info, Player_Skill_Info) {
        Player_Info.Character_MP -= Player_Skill_Info.Skill_Decrease_Mp;
    }
}