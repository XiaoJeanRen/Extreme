const fs = require("fs");
const userData = require("../players_data.json");
const life_time = require("../players_life_time.json");
const life_loot = require("..//life_loots/hunt_loot_Material");
const player_life_skill = require("../players_Life_skill_data.json");

//玩家取得冒險獎勵指令
let formatSecond = function (number) {
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

let life_time_reset = function (playerID) {
    life_time[playerID].isLife = false;
    life_time[playerID].life_type = "無";
    life_time[playerID].life_place = "無";
    life_time[playerID].life_time = 0;
    life_time[playerID].need_time = 0;
    userData[playerID].Character_isLifeSkill = "無";
}

module.exports = class life_reward {
    constructor() {
        this.name = 'lreward',
            this.alias = ['生活結算', 'lre'],
            this.usage = '!lreward'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「生活結算」`)
        let pass_time = Math.round(Math.abs(life_time[playerID].life_time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(life_time[playerID].need_time);


        if (life_time[playerID].isLife === false) return message.reply("你還未參與任何活動").then(msg => {
            msg.delete(10000)
        });

        

        if (pass_time > life_time[playerID].need_time) {
            let life_skill_info = player_life_skill[playerID];
            let Life_Type = life_time[playerID].life_type; //玩家選擇方式
            let MapsName = life_time[playerID].life_place; //玩家選擇地點

            let Random_Point = Math.floor(Math.random() * 25) + 1;

            let getMaterial = life_loot.Test_Material(playerID, MapsName);

            if(Life_Type == "挖礦"){
                life_skill_info.挖礦_Point += Random_Point;
            }else if(Life_Type == "伐木"){
                life_skill_info.挖礦_Point += Random_Point;
            }else if(Life_Type == "採集"){
                life_skill_info.挖礦_Point += Random_Point;
            }else if(Life_Type == "釣魚"){
                life_skill_info.挖礦_Point += Random_Point;
            }else if(Life_Type == "加工"){
                life_skill_info.挖礦_Point += Random_Point;
            }


            message.reply(`本次活動「${Life_Type}」，在${MapsName}得到了，${getMaterial}`).then(msg => {
                msg.delete(10000)
            });
            life_time_reset(playerID)


        } else {
            message.reply(`活動尚未完成，所需時間：${need_time}，活動已過的時間：${actual_time}`).then(msg => {
                msg.delete(10000)
            });
        }

        fs.writeFile("./players_life_time.json", JSON.stringify(life_time), (err) => {});

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

    }
}