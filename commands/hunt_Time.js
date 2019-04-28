const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_Hunt = require("../players_hunt_monster.json");
//玩家查看冒險時間指令
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

module.exports = class create_Character {
    constructor() {
        this.name = 'hunt_time',
        this.alias = ['戰鬥時間','ht'],
        this.usage = '!hunt_time'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「冒險時間」`)
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        let playerHunt_Data = player_Hunt[playerID];
        // adv_time[playerID].adventure_time 過去時間
        // (message.createdAt / 1000) 現在時間
        // time 秒數
        let pass_time = Math.round(Math.abs(playerHunt_Data.Monster_Time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(playerHunt_Data.Monster_Need_Time);
        if (pass_time > playerHunt_Data.Monster_Need_Time) {
            message.reply(`狩獵已完成，超出時間將不會有額外獎勵\n狩獵已經過的時間：${actual_time}\n請輸入!hreward，結束戰鬥領取獎勵.`).then(msg => {msg.delete(10000)});
        } else {
            message.reply(`狩獵尚未完成，狩獵完成所需時間：${need_time}，狩獵已經過的時間：${actual_time}\n你可以藉由使用技能，使狩獵成功率或時間增加`).then(msg => {msg.delete(10000)});
        }
    }
}