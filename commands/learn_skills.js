const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const all_Skills_Data = require("../skills_data.json");
const player_learn_Skill = require("../skills_players.json");
//角色升級指令

module.exports = class learnskill {
    constructor() {
        this.name = 'learnS',
            this.alias = ['學習技能','le'],
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
        console.log(all_Skills_Data[learnSkillID])
        let player_skill_data = "技能" + player_learn_Skill[playerID].totalSkill;
        player_learn_Skill[playerID] + player_skill_data;
        //player_learn_Skill[playerID] + all_Skills_Data[learnSkillID];
        
        fs.writeFile("./skills_players.json", JSON.stringify(player_learn_Skill), (err) => {});
        message.reply("成功");
    }
}