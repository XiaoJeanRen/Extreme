const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");
const all_hunt = require("../all_hunts_id_data.json");
const adv_time = require("../players_adventure_time.json");
const loots_money = require("../loots/loot_Money.js");
const loots_exp = require("../loots/loot_Exp.js");
const loots_item = require("../loots/loot_Item.js");
const loots_hunt_Target = require("../loots/loot_hunt_Target.js");

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
        return true
    }
}

let invhfull = function (myinv_info,playerID) {
    if (myinv_info.invh_1.itemID != "000" &&
        myinv_info.invh_2.itemID != "000" &&
        myinv_info.invh_3.itemID != "000") {
        console.log(`使用者(ID: ${playerID})狩獵目標已滿.`)
        return true
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

let adv_time_reset = function (playerID) {
    adv_time[playerID].isAdventure = false;
    adv_time[playerID].adventure_id = "000";
    adv_time[playerID].adventure_place = "無";
    adv_time[playerID].adventure_time = 0;
    adv_time[playerID].need_time = 0;
    userData[playerID].Character_Adventure = "尚未冒險";
}

module.exports = class adventure_reward {
    constructor() {
        this.name = 'reward',
            this.alias = ['獎勵'],
            this.usage = '!reward'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「獎勵」`)
        let pass_time = Math.round(Math.abs(adv_time[playerID].adventure_time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(adv_time[playerID].need_time);
        if (adv_time[playerID].isAdventure === false) return message.reply("你還未參與任何冒險活動").then(msg => {
            msg.delete(10000)
        });
        if (pass_time > adv_time[playerID].need_time) {

            let adventure_number = adv_time[playerID].adventure_id; //玩家選擇副本id
            console.log(adventure_number)
            /**
             * 金錢處理
             * loots_money => require("../loots/loot_Money.js");
             */
            let getMoney = loots_money.lootMoney(adventure_number);
            userData[playerID].Character_Money += getMoney; //得到金錢
            console.log(`使用者(ID: ${playerID})已取得金錢${getMoney}元`)
            /**
             * 經驗處理
             * loots_exp  => require("../loots/loot_Exp.js");
             */
            let getExp = loots_exp.lootExp(adventure_number);
            userData[playerID].Character_Exp += getExp; //得到Exp
            console.log(`使用者(ID: ${playerID})已取得經驗${getExp}元`)
            /**
             * 取得道具處理
             * loots_item  => require("../loots/loot_Item.js");
             */
            let getitem = loots_item.lootItem(playerID);

            /**
             * 取得狩獵目標
             */
            let getHunt = loots_hunt_Target.loot_Target(playerID);
            /**
             * 玩家冒險資料重置
             */
            adv_time_reset(playerID)
            if(invfull(inv[playerID],playerID)){
                message.reply("你的背包已滿，請清理後再進行冒險，以免無法獲得道具.").then(msg => {
                    msg.delete(10000)
                });
            }
            if(invhfull(inv[playerID],playerID)){
                message.reply("你的狩獵目標已滿，請清理後再進行冒險，以免無法獲得狩獵目標.").then(msg => {
                    msg.delete(10000)
                });
            }
            message.reply(`金幣獎勵「${getMoney}元」已獲得.\n經驗獎勵「${getExp}」已獲得.\n道具獎勵「${getitem}」已獲得\n額外獎勵「${getHunt}」已獲得.`).then(msg => {
                msg.delete(10000)
            });
        } else {
            message.reply(`冒險尚未完成，所需時間：${need_time}，冒險已經過的時間：${actual_time}`).then(msg => {
                msg.delete(10000)
            });
        }

        fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) => {});

        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

        fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) => {});

        fs.writeFile("./all_hunts_id_data.json", JSON.stringify(all_hunt), (err) => {});

    }
}