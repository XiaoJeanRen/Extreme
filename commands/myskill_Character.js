const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_learn_Skill = require("../players_skills.json");
//查看角色狀態指令
module.exports = class myskill {
    constructor() {
        this.name = 'myskill',
            this.alias = ['mysk', '技能表'],
            this.usage = '!myskill'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let info = userData[playerID];
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「角色資訊」`)
        let player_skills = player_learn_Skill[playerID];
        let checkMySkill = args[1];
        if (!args[1]) return message.reply(
            "指令錯誤，指令格式為 !mysk [法師 / 牧師 / 弓手 / 盜賊 / 騎士 / 戰士]"
        ).then(msg => {
            msg.delete(10000)
        });

        switch (checkMySkill) {
            case '法師系':
                let magicEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.characterName + "**")
                    .addField("**__法師系技能__**",
                        "**魔力凝聚　Level_" + player_skills.skill_1001.skillLevel + "　**``習得狀況：" + player_skills.skill_1001.isskillGet + "``\n" +
                        "**法杖精通　Level_" + player_skills.skill_1002.skillLevel + "　**``習得狀況：" + player_skills.skill_1002.isskillGet + "``\n" +
                        "**詠唱精通　Level_" + player_skills.skill_1003.skillLevel + "　**``習得狀況：" + player_skills.skill_1003.isskillGet + "``\n" +
                        "**魔力衝擊　Level_" + player_skills.skill_1004.skillLevel + "　**``習得狀況：" + player_skills.skill_1004.isskillGet + "``\n" +
                        "**魔法箭　　Level_" + player_skills.skill_1005.skillLevel + "　**``習得狀況：" + player_skills.skill_1005.isskillGet + "``\n" +
                        "**魔法屏障　Level_" + player_skills.skill_1006.skillLevel + "　**``習得狀況：" + player_skills.skill_1006.isskillGet + "``\n"
                    )
                message.reply(magicEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '牧師系':
                let priestEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.characterName + "**")
                    .addField("**__牧師系技能__**",
                        "**治癒精通　Level_" + player_skills.skill_2001.skillLevel + "　**``習得狀況：" + player_skills.skill_2001.isskillGet + "``\n" +
                        "**治癒術　　Level_" + player_skills.skill_2002.skillLevel + "　**``習得狀況：" + player_skills.skill_2002.isskillGet + "``\n" +
                        "**驅散　　　Level_" + player_skills.skill_2003.skillLevel + "　**``習得狀況：" + player_skills.skill_2003.isskillGet + "``\n" +
                        "**真實　　　Level_" + player_skills.skill_2004.skillLevel + "　**``習得狀況：" + player_skills.skill_2004.isskillGet + "``\n" +
                        "**代價　　　Level_" + player_skills.skill_2005.skillLevel + "　**``習得狀況：" + player_skills.skill_2005.isskillGet + "``\n" +
                        "**奮起　　　Level_" + player_skills.skill_2006.skillLevel + "　**``習得狀況：" + player_skills.skill_2006.isskillGet + "``\n"
                    )
                message.reply(priestEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '弓手系':
                let archerEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.characterName + "**")
                    .addField("**__弓手系技能__**",
                        "**弓弩精通　Level_" + player_skills.skill_3001.skillLevel + "　**``習得狀況：" + player_skills.skill_3001.isskillGet + "``\n" +
                        "**遠程精通　Level_" + player_skills.skill_3002.skillLevel + "　**``習得狀況：" + player_skills.skill_3002.isskillGet + "``\n" +
                        "**箭袋精通　Level_" + player_skills.skill_3003.skillLevel + "　**``習得狀況：" + player_skills.skill_3003.isskillGet + "``\n" +
                        "**凝神　　　Level_" + player_skills.skill_3004.skillLevel + "　**``習得狀況：" + player_skills.skill_3004.isskillGet + "``\n" +
                        "**元素附加　Level_" + player_skills.skill_3005.skillLevel + "　**``習得狀況：" + player_skills.skill_3005.isskillGet + "``\n" +
                        "**二連箭　　Level_" + player_skills.skill_3006.skillLevel + "　**``習得狀況：" + player_skills.skill_3006.isskillGet + "``\n"
                    )
                message.reply(archerEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '盜賊系':
                let thiefEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.characterName + "**")
                    .addField("**__盜賊系技能__**",
                        "**匕首精通　Level_" + player_skills.skill_4001.skillLevel + "　**``習得狀況：" + player_skills.skill_4001.isskillGet + "``\n" +
                        "**搜刮精通　Level_" + player_skills.skill_4002.skillLevel + "　**``習得狀況：" + player_skills.skill_4002.isskillGet + "``\n" +
                        "**突襲　　　Level_" + player_skills.skill_4003.skillLevel + "　**``習得狀況：" + player_skills.skill_4003.isskillGet + "``\n" +
                        "**潛伏　　　Level_" + player_skills.skill_4004.skillLevel + "　**``習得狀況：" + player_skills.skill_4004.isskillGet + "``\n" +
                        "**背刺　　　Level_" + player_skills.skill_4005.skillLevel + "　**``習得狀況：" + player_skills.skill_4005.isskillGet + "``\n" +
                        "**準備　　　Level_" + player_skills.skill_4006.skillLevel + "　**``習得狀況：" + player_skills.skill_4006.isskillGet + "``\n"
                    )
                message.reply(thiefEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '騎士系':
                let knightEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.characterName + "**")
                    .addField("**__騎士系技能__**",
                        "**盾牌精通　Level_" + player_skills.skill_5001.skillLevel + "　**``習得狀況：" + player_skills.skill_5001.isskillGet + "``\n" +
                        "**防禦精通　Level_" + player_skills.skill_5002.skillLevel + "　**``習得狀況：" + player_skills.skill_5002.isskillGet + "``\n" +
                        "**防禦姿態　Level_" + player_skills.skill_5003.skillLevel + "　**``習得狀況：" + player_skills.skill_5003.isskillGet + "``\n" +
                        "**盾牌衝擊　Level_" + player_skills.skill_5004.skillLevel + "　**``習得狀況：" + player_skills.skill_5004.isskillGet + "``\n" +
                        "**挑釁　　　Level_" + player_skills.skill_5005.skillLevel + "　**``習得狀況：" + player_skills.skill_5005.isskillGet + "``\n" +
                        "**鼓舞　　　Level_" + player_skills.skill_5006.skillLevel + "　**``習得狀況：" + player_skills.skill_5006.isskillGet + "``\n"
                    )
                message.reply(knightEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '戰士系':
                let warriorEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.characterName + "**")
                    .addField("**__戰士系技能__**",
                        "**近戰精通　Level_" + player_skills.skill_6001.skillLevel + "　**``習得狀況：" + player_skills.skill_6001.isskillGet + "``\n" +
                        "**耐力訓練　Level_" + player_skills.skill_6002.skillLevel + "　**``習得狀況：" + player_skills.skill_6002.isskillGet + "``\n" +
                        "**勇氣　　　Level_" + player_skills.skill_6003.skillLevel + "　**``習得狀況：" + player_skills.skill_6003.isskillGet + "``\n" +
                        "**劈砍　　　Level_" + player_skills.skill_6004.skillLevel + "　**``習得狀況：" + player_skills.skill_6004.isskillGet + "``\n" +
                        "**突刺　　　Level_" + player_skills.skill_6005.skillLevel + "　**``習得狀況：" + player_skills.skill_6005.isskillGet + "``\n" +
                        "**敲打　　　Level_" + player_skills.skill_6006.skillLevel + "　**``習得狀況：" + player_skills.skill_6006.isskillGet + "``\n"
                    )
                message.reply(warriorEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            default:
                break;
        }
    }

}