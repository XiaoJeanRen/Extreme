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
                    .setTitle("**" + info.CharacterName + "**")
                    .addField("**__法師系技能__**",
                        "**魔力凝聚　Level_" + player_skills.技能1001.Skill_Level + "　**``習得狀況：" + player_skills.技能1001.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能1001.Skill_Info + "``__\n" +
                        "**法師學徒　Level_" + player_skills.技能1002.Skill_Level + "　**``習得狀況：" + player_skills.技能1002.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能1002.Skill_Info + "``__\n" +
                        /*"**防禦姿態　Level_" + player_skills.技能5003.Skill_Level + "　**``習得狀況：" + player_skills.技能5003.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5003.Skill_Info + "``__\n" +*/
                        "**火球術　　Level_" + player_skills.技能1004.Skill_Level + "　**``習得狀況：" + player_skills.技能1004.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能1004.Skill_Info + "``__\n"
                        /*"**挑釁　　　Level_" + player_skills.技能5005.Skill_Level + "　**``習得狀況：" + player_skills.技能5005.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5005.Skill_Info + "``__\n" 
                        "**鼓舞　　　Level_" + player_skills.技能5006.Skill_Level + "　**``習得狀況：" + player_skills.技能5006.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5006.Skill_Info + "``__\n" */
                    )
                message.reply(magicEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '牧師系':
                let priestEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.CharacterName + "**")
                    .addField("**__牧師系技能__**",
                        "**成長　　　Level_" + player_skills.技能2001.Skill_Level + "　**``習得狀況：" + player_skills.技能2001.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能2001.Skill_Info + "``__\n" +
                        "**治療術　　Level_" + player_skills.技能2002.Skill_Level + "　**``習得狀況：" + player_skills.技能2002.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能2002.Skill_Info + "``__\n" +
                        "**正面　　　Level_" + player_skills.技能2003.Skill_Level + "　**``習得狀況：" + player_skills.技能2003.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能2003.Skill_Info + "``__\n" +
                        "**反面　　　Level_" + player_skills.技能2004.Skill_Level + "　**``習得狀況：" + player_skills.技能2004.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能2004.Skill_Info + "``__\n"
                        /*"**挑釁　　　Level_" + player_skills.技能5005.Skill_Level + "　**``習得狀況：" + player_skills.技能5005.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5005.Skill_Info + "``__\n" 
                        "**鼓舞　　　Level_" + player_skills.技能5006.Skill_Level + "　**``習得狀況：" + player_skills.技能5006.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5006.Skill_Info + "``__\n" */
                    )
                message.reply(priestEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '弓手系':
                message.reply("尚未開放").then(msg => {
                    msg.delete(20000)
                });
                /*let archerEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.CharacterName + "**")
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
                break;*/
            case '盜賊系':
                message.reply("尚未開放").then(msg => {
                    msg.delete(20000)
                });
                /*let thiefEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.CharacterName + "**")
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
                break;*/
            case '騎士系':
                let knightEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.CharacterName + "**")
                    .addField("**__騎士系技能__**",
                        "**盾牌精通　Level_" + player_skills.技能5001.Skill_Level + "　**``習得狀況：" + player_skills.技能5001.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5001.Skill_Info + "``__\n" +
                        "**防禦精通　Level_" + player_skills.技能5002.Skill_Level + "　**``習得狀況：" + player_skills.技能5002.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5002.Skill_Info + "``__\n" +
                        /*"**防禦姿態　Level_" + player_skills.技能5003.Skill_Level + "　**``習得狀況：" + player_skills.技能5003.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5003.Skill_Info + "``__\n" +*/
                        "**盾牌衝擊　Level_" + player_skills.技能5004.Skill_Level + "　**``習得狀況：" + player_skills.技能5004.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5004.Skill_Info + "``__\n" +
                        "**挑釁　　　Level_" + player_skills.技能5005.Skill_Level + "　**``習得狀況：" + player_skills.技能5005.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能5005.Skill_Info + "``__\n"
                        /* "**鼓舞　　　Level_" + player_skills.技能5006.Skill_Level + "　**``習得狀況：" + player_skills.技能5006.Skill_isLearn + "``" +
                         "\n技能敘述：__``" + player_skills.技能5006.Skill_Info + "``__\n" */
                    )
                message.reply(knightEmbed).then(msg => {
                    msg.delete(20000)
                });
                break;
            case '戰士系':
                let warriorEmbed = new Discord.RichEmbed()
                    .setTitle("**" + info.CharacterName + "**")
                    .addField("**__戰士系技能__**",
                        "**近戰精通　Level_" + player_skills.技能6001.Skill_Level + "　**``習得狀況：" + player_skills.技能6001.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能6001.Skill_Info + "``__\n" +
                        "**耐力訓練　Level_" + player_skills.技能6002.Skill_Level + "　**``習得狀況：" + player_skills.技能6002.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能6002.Skill_Info + "``__\n" +
                        "**勇氣　　　Level_" + player_skills.技能6003.Skill_Level + "　**``習得狀況：" + player_skills.技能6003.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能6003.Skill_Info + "``__\n" +
                        "**劈砍　　　Level_" + player_skills.技能6004.Skill_Level + "　**``習得狀況：" + player_skills.技能6004.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能6004.Skill_Info + "``__\n"
                        /*"**突刺　　　Level_" + player_skills.技能6005.Skill_Level + "　**``習得狀況：" + player_skills.技能6005.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能6005.Skill_Info + "``__\n" +
                        "**敲打　　　Level_" + player_skills.技能6006.Skill_Level + "　**``習得狀況：" + player_skills.技能6006.Skill_isLearn + "``" +
                        "\n技能敘述：__``" + player_skills.技能6006.Skill_Info + "``__\n" */
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