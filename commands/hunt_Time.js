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

let player_Hunt_reset = function (playerID) {
    console.log(player_Hunt[playerID].Monster_Name)
    player_Hunt[playerID].Monster_Name = "無";
    player_Hunt[playerID].Monster_ID = "無";
    player_Hunt[playerID].Monster_Number = 0;
    player_Hunt[playerID].Monster_Time = 0;
    player_Hunt[playerID].Monster_Need_Time = 0;
    player_Hunt[playerID].Fight_place = "無";
    player_Hunt[playerID].isFightMonster = false;
    player_Hunt[playerID].FightMonster = "尚未狩獵";
    player_Hunt[playerID].FightMonster_TotalHP = 0;
    player_Hunt[playerID].FightMonster_FightHP = 0;
    userData[playerID].Character_Hunt = "無";
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
        if (player_Hunt[playerID].isFightMonster === false) return message.reply("你還未參與任何狩獵活動").then(msg => {
            msg.delete(10000)
        });

        let isPlayer_Dead = function(){
            if (userData[playerID].Player_info.Character_HP <= 0){
                return true;
            }
        }

        if(isPlayer_Dead()){
            player_Hunt_reset(playerID);
            return message.reply(`角色死亡`).then(msg => {
                msg.delete(10000)
            });
        }
        let playerHunt_Data = player_Hunt[playerID];
        // adv_time[playerID].adventure_time 過去時間
        // (message.createdAt / 1000) 現在時間
        // time 秒數
        let pass_time = Math.round(Math.abs(playerHunt_Data.Monster_Time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(playerHunt_Data.Monster_Need_Time);
        if (pass_time > playerHunt_Data.Monster_Need_Time) {
            message.reply(`狩獵已結束，超出時間將不會有額外獎勵\n狩獵已過的時間：${actual_time}\n請輸入!hreward，結束狩獵領取獎勵.`).then(msg => {msg.delete(10000)});
        } else {
            message.reply(`狩獵中，挑戰狩獵時間：${need_time}，狩獵已過的時間：${actual_time}\n你可以藉由使用技能，使狩獵成功率增加`).then(msg => {msg.delete(10000)});
        }
    }
}