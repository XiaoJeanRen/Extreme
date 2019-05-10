const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const life_time = require("../players_life_time.json");

//玩家冒險指令
let chooseMaps = function(choose_maps, playerID, Life_time){
    switch (choose_maps) {
        case '鄰近山脈':
            life_time[playerID].isLife = true;
            life_time[playerID].life_time = Life_time;
            life_time[playerID].need_time = 15;
            life_time[playerID].life_type = "挖礦";
            life_time[playerID].life_place = choose_maps;
            userData[playerID].Character_isLifeSkill = "正在進行活動";
            return "選擇礦區「鄰近山脈」";
        case '古代地道':
            life_time[playerID].isLife = true;
            life_time[playerID].life_time = Life_time;
            life_time[playerID].need_time = 300;
            life_time[playerID].life_type = "挖礦";
            life_time[playerID].life_place = choose_maps;
            userData[playerID].Character_isLifeSkill = "正在進行活動";
            return "選擇礦區「古代地道」";
        default:
            return "選擇地圖失敗，請重新選擇.";
    }
}

module.exports = class Lifemine {
    constructor() {
        this.name = '挖礦',
        this.alias = ['mine','MINE'],
        this.usage = '!挖礦'
    }

    async run(bot, message, args) {
        let Life_time = (message.createdAt / 1000);
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        let Player_info = userData[playerID];
        if (Player_info.Character_HP <= 0) return message.reply("你似乎已經死亡了...請輸入!revive").then(msg => {
            msg.delete(10000)
        });
        if (!args[1]) return message.reply("挖礦請輸入!mine <目的地>，查看地區請輸入!maps 礦區").then(msg => {msg.delete(10000)});
        let choose_maps = args[1];

        console.log(`使用者(ID: ${playerID})使用「挖礦」`)
        
        if (life_time[playerID].isLife === false) {
            message.reply("出發礦區，" + chooseMaps(choose_maps, playerID, Life_time)).then(msg => {msg.delete(10000)});
        }else{
            message.reply("已在進行其他活動").then(msg => {msg.delete(10000)});
        }
    
        fs.writeFile("./players_life_time.json", JSON.stringify(life_time), (err) =>{
        });

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) =>{
        });

        
    }
}