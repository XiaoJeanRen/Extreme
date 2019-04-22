const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");
const adv_time = require("../players_adventure_time.json");

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

var adv_time_reset = function (playerID){
    adv_time[playerID].isAdventure = false;
    adv_time[playerID].adventure_id = "000";
    adv_time[playerID].adventure_place = "無";
    adv_time[playerID].adventure_time = 0;
    adv_time[playerID].need_time = 0;
    userData[playerID].adventure = "無";
}

var lootMoney = function (number) {
    switch (number) {
        case "001":
            return Math.floor(Math.random() * 50) + 10;
        case "002":
            return Math.floor(Math.random() * 100) + 150;
        default:
            break;
    }
};

var lootMoney = function (number) {
    switch (number) {
        case "001":
            return Math.floor(Math.random() * 50) + 10;
        case "002":
            return Math.floor(Math.random() * 100) + 150;
        default:
            break;
    }
};


let lootItem = function(adventure_number){
    all_item[all_item["總資料"].number] = {
        item_Id: all_item["總資料"].number,
        item_Type: "裝備",
        equip_Name: "新手木劍",
        equip_Type: "武器",
        add_max_Hp: 0,
        add_max_Mp: 0,
        add_max_Ap: 0,
        add_max_Weight: 0,
        add_atk: 10,
        add_def: 0,
        needLevel: 1,
        needClass: "無",
        needWeight: 1,
        special: "無",
        itemInfo: "無",
        itemValue: 0,
        itemSpecialId: 1
    }
    all_item["總資料"].number += 1;
    let dropitem_id = `${all_item["總資料"].number}`;
};

module.exports = class create_Character {
    constructor() {
        this.name = 'reward',
        this.alias = ['獎勵'],
        this.usage = '!reward'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「獎勵」`)
        let pass_time = Math.round(Math.abs(adv_time[playerID].adventure_time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(adv_time[playerID].need_time);
        if (pass_time > adv_time[playerID].need_time) {

            let adventure_number = adv_time[playerID].adventure_id; //玩家選擇副本id
            console.log(adventure_number)
            /**
             * 金錢處理
             */
            let getMoney = lootMoney(adventure_number); 
            userData[playerID].money += getMoney; //得到金錢
            console.log(`使用者(ID: ${playerID})已取得金錢${getMoney}元`)
            /**
             * 經驗處理
             */
            let getExp = lootExp();


            /**
             * 玩家冒險資料重置
             */
            adv_time_reset(playerID);

            message.reply(`金幣獎勵「${getMoney}元」已到您的背包.`).then(msg => {
                msg.delete(10000)
            });
        } else {
            message.reply(`冒險尚未完成，所需時間：${need_time}，冒險已經過的時間：${actual_time}`).then(msg => {msg.delete(10000)});
        }
        
        fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) =>{
        });

        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
        });

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) =>{
        });
        
        fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) =>{
        });
        
    }
}