const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");
const hunt_time = require("../players_hunt_monster.json");
const loots_money = require("../loots/loot_Money.js");
const loots_exp = require("../loots/loot_Exp.js");
const loots_item = require("../loots/loot_Item.js");

let invfull = function (myinv_info,playerID) {
    if (myinv_info.inv_1.itemID != "000" &&
        myinv_info.inv_2.itemID != "000" &&
        myinv_info.inv_3.itemID != "000" &&
        myinv_info.inv_4.itemID != "000" &&
        myinv_info.inv_5.itemID != "000" &&
        myinv_info.inv_6.itemID != "000" &&
        myinv_info.inv_7.itemID != "000" &&
        myinv_info.inv_8.itemID != "000" &&
        myinv_info.inv_9.itemID != "000" &&
        myinv_info.inv_10.itemID != "000") {
        console.log(`使用者(ID: ${playerID})背包已滿.`)
        return "full"
    }
}
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

let hunt_time_reset = function (playerID) {
    hunt_time[playerID].Monster_Name = "無";
    hunt_time[playerID].Monster_ID = "無";
    hunt_time[playerID].Monster_Number = 0;
    hunt_time[playerID].Monster_Time = 0;
    hunt_time[playerID].Monster_Need_Time = 0;
    hunt_time[playerID].Fight_place = "無";
    hunt_time[playerID].isFightMonster = false;
    hunt_time[playerID].FightMonster = "尚未狩獵";
    hunt_time[playerID].FightMonster_TotalHP = 0;
    hunt_time[playerID].FightMonster_FightHP = 0;
    userData[playerID].Character_Hunt = "無";
}

module.exports = class fight_reward {
    constructor() {
        this.name = 'hreward',
            this.alias = ['戰鬥獎勵','hre'],
            this.usage = '!hreward'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「戰鬥獎勵」`)
        let pass_time = Math.round(Math.abs(hunt_time[playerID].Monster_Time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(hunt_time[playerID].Monster_Need_Time);
        if (hunt_time[playerID].isFightMonster === false) return message.reply("你還未參與任何狩獵活動").then(msg => {
            msg.delete(10000)
        });



    }
}