const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const adv_time = require("../players_adventure_time.json");
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
        this.name = 'adv_time',
        this.alias = ['冒險時間','advtime'],
        this.usage = '!adv_time'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「冒險時間」`)
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        // adv_time[playerID].adventure_time 過去時間
        // (message.createdAt / 1000) 現在時間
        // time 秒數
        let pass_time = Math.round(Math.abs(adv_time[playerID].adventure_time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(adv_time[playerID].need_time);
        if (pass_time > adv_time[playerID].need_time) {
            message.reply(`冒險已完成，超出時間將不會有額外獎勵\n冒險已經過的時間：${actual_time}\n請輸入!reward，結束冒險領取獎勵.`).then(msg => {msg.delete(10000)});
        } else {
            message.reply(`冒險尚未完成，所需時間：${need_time}，冒險已經過的時間：${actual_time}`).then(msg => {msg.delete(10000)});
        }
    }
}