const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const all_Skills_Data = require("../all_skills_data.json");
const player_learn_Skill = require("../skills_players.json");
//角色升級指令

module.exports = class learnskill {
    constructor() {
        this.name = 'learnS',
            this.alias = ['學習技能', 'le'],
            this.usage = '!learnS'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let PlayerInfo = userData[playerID];
        console.log(`使用者(ID: ${playerID})使用「技能學習」`)
        if (!PlayerInfo) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });
        let learnSkillID = args[1];
        if (!args[1]) return message.reply("指令錯誤，指令格式為 !learnS 技能代號").then(msg => {
            msg.delete(10000)
        });
        if (!all_Skills_Data[learnSkillID]) return message.reply("技能代號錯誤").then(msg => {
            msg.delete(10000)
        });
        let player_skills = player_learn_Skill[playerID];
        let all_Skills = all_Skills_Data[learnSkillID];

        switch (learnSkillID) {
            case 'skill_1001':
                player_skills.skill_1001 = all_Skills
                break;
            case 'skill_1002':
                player_skills.skill_1002 = all_Skills
                break;
            case 'skill_1003':
                player_skills.skill_1003 = all_Skills
                break;
            case 'skill_1004':
                player_skills.skill_1004 = all_Skills
                break;
            case 'skill_1005':
                player_skills.skill_1005 = all_Skills
                break;
            case 'skill_1006':
                player_skills.skill_1006 = all_Skills
                break;
            case 'skill_2001':
                player_skills.skill_2001 = all_Skills
                break;
            case 'skill_2002':
                player_skills.skill_2002 = all_Skills
                break;
            case 'skill_2003':
                player_skills.skill_2003 = all_Skills
                break;
            case 'skill_2004':
                player_skills.skill_2004 = all_Skills
                break;
            case 'skill_2005':
                player_skills.skill_2005 = all_Skills
                break;
            case 'skill_2006':
                player_skills.skill_2006 = all_Skills
                break;
            case 'skill_3001':
                player_skills.skill_3001 = all_Skills
                break;
            case 'skill_3002':
                player_skills.skill_3002 = all_Skills
                break;
            case 'skill_3003':
                player_skills.skill_3003 = all_Skills
                break;
            case 'skill_3004':
                player_skills.skill_3004 = all_Skills
                break;
            case 'skill_3005':
                player_skills.skill_3005 = all_Skills
                break;
            case 'skill_3006':
                player_skills.skill_3006 = all_Skills
                break;
            case 'skill_4001':
                player_skills.skill_4001 = all_Skills
                break;
            case 'skill_4002':
                player_skills.skill_4002 = all_Skills
                break;
            case 'skill_4003':
                player_skills.skill_4003 = all_Skills
                break;
            case 'skill_4004':
                player_skills.skill_4004 = all_Skills
                break;
            case 'skill_4005':
                player_skills.skill_4005 = all_Skills
                break;
            case 'skill_4006':
                player_skills.skill_4006 = all_Skills
                break;
            case 'skill_5001':
                player_skills.skill_5001 = all_Skills
                break;
            case 'skill_5002':
                player_skills.skill_5002 = all_Skills
                break;
            case 'skill_5003':
                player_skills.skill_5003 = all_Skills
                break;
            case 'skill_5004':
                player_skills.skill_5004 = all_Skills
                break;
            case 'skill_5005':
                player_skills.skill_5005 = all_Skills
                break;
            case 'skill_5006':
                player_skills.skill_5006 = all_Skills
                break;
            case 'skill_6001':
                player_skills.skill_6001 = all_Skills
                break;
            case 'skill_6002':
                player_skills.skill_6002 = all_Skills
                break;
            case 'skill_6003':
                player_skills.skill_6003 = all_Skills
                break;
            case 'skill_6004':
                player_skills.skill_6004 = all_Skills
                break;
            case 'skill_6005':
                player_skills.skill_6005 = all_Skills
                break;
            case 'skill_6006':
                player_skills.skill_6006 = all_Skills
                break;
        }



        fs.writeFile("./skills_players.json", JSON.stringify(player_learn_Skill), (err) => {});
        message.reply("成功");
    }
}