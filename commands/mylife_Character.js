const Discord = require("discord.js");
const userData = require("../players_data.json");
const life_time = require("../players_life_time.json");
const player_life_skill = require("../players_Life_skill_data.json");
//查看角色狀態指令

var formatSecond = function (number) {
    let secondTime = number; //秒
    let minuteTime = 0; //分
    let hourTime = 0; //時
    if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    let result = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "時" + result;
    }
    console.log("已過時間:" + result);
    return result;

}
module.exports = class myLIFE {
    constructor() {
        this.name = 'myl',
            this.alias = ['角色生活技能', '生活技能', 'myiife','MYL'],
            this.usage = '!myl'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let info = userData[playerID];
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「角色生活技能」`)
        let pass_time = Math.round(Math.abs(life_time[playerID].life_time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(life_time[playerID].need_time);

        let life_info = life_time[playerID];
        let life_skill_info = player_life_skill[playerID];
        if(life_info.life_type == "無") actual_time = "0秒";
        let playerLifeEmbed = new Discord.RichEmbed()
            .setAuthor(info.CharacterName)
            .setColor(info.Character_Color)
            .setThumbnail(message.author.displayAvatarURL)
            .addField("**正在執行的生活技能**", 
            "行動：" + life_info.life_type + 
            "\n地點：" + life_info.life_place + 
            "\n所需時間：" + need_time + 
            "\n已過時間：" + actual_time
            )
            .addField("**我的生活技能**",
            "挖礦等級：" + life_skill_info.挖礦_Level + "　挖礦熟練：" + life_skill_info.挖礦_Point +
            "\n伐木等級：" + life_skill_info.伐木_Level + "　伐木熟練：" + life_skill_info.伐木_Point +
            "\n採集等級：" + life_skill_info.採集_Level + "　採集熟練：" + life_skill_info.採集_Point +
            "\n釣魚等級：" + life_skill_info.釣魚_Level + "　釣魚熟練：" + life_skill_info.釣魚_Point +
            "\n栽培等級：" + life_skill_info.栽培_Level + "　栽培熟練：" + life_skill_info.栽培_Point +
            "\n煉金等級：" + life_skill_info.煉金_Level + "　煉金熟練：" + life_skill_info.煉金_Point +
            "\n料理等級：" + life_skill_info.料理_Level + "　料理熟練：" + life_skill_info.料理_Point +
            "\n拍賣等級：" + life_skill_info.拍賣_Level + "　拍賣熟練：" + life_skill_info.拍賣_Point +
            "\n附魔等級：" + life_skill_info.附魔_Level + "　附魔熟練：" + life_skill_info.附魔_Point +
            "\n加工等級：" + life_skill_info.加工_Level + "　加工熟練：" + life_skill_info.加工_Point +
            "\n開鎖等級：" + life_skill_info.開鎖_Level + "　開鎖熟練：" + life_skill_info.開鎖_Point +
            "\n強化等級：" + life_skill_info.強化_Level + "　強化熟練：" + life_skill_info.強化_Point 
            )
            ;

        message.reply(playerLifeEmbed).then(msg => {
            msg.delete(20000)
        });
    }

}