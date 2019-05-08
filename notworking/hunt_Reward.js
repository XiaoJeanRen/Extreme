const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");
const player_Hunt = require("../players_hunt_monster.json");
const loots_money = require("../hunt_loots/hunt_loot_Money.js");
const loots_exp = require("../hunt_loots/hunt_loot_Exp.js");
const loots_item = require("../hunt_loots/hunt_loot_Item.js");
const player_Original_Hunt_data = require("../players_original_fight_data.json");

let invfull = function (myinv_info, playerID) {
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
    userData[playerID].Character_Str = player_Original_Hunt_data[playerID].Character_Str;
    userData[playerID].Character_Int = player_Original_Hunt_data[playerID].Character_Int;
    userData[playerID].Character_Dex = player_Original_Hunt_data[playerID].Character_Dex;
    userData[playerID].Character_Acc = player_Original_Hunt_data[playerID].Character_Acc;
    userData[playerID].Character_DMG = player_Original_Hunt_data[playerID].Character_DMG;
    userData[playerID].Character_DEF = player_Original_Hunt_data[playerID].Character_DEF;
    userData[playerID].Character_M_DMG = player_Original_Hunt_data[playerID].Character_M_DMG;
    userData[playerID].Character_M_Def = player_Original_Hunt_data[playerID].Character_M_Def;
    userData[playerID].Character_Strike = player_Original_Hunt_data[playerID].Character_Strike;
    userData[playerID].Character_Accurate = player_Original_Hunt_data[playerID].Character_Accurate;
    userData[playerID].Character_Taunt = player_Original_Hunt_data[playerID].Character_Taunt;
    userData[playerID].Character_HIT_DMG = player_Original_Hunt_data[playerID].Character_HIT_DMG;
    userData[playerID].Character_HIT_DEF = player_Original_Hunt_data[playerID].Character_HIT_DEF;
    userData[playerID].Character_CUT_DMG = player_Original_Hunt_data[playerID].Character_CUT_DMG;
    userData[playerID].Character_CUT_DEF = player_Original_Hunt_data[playerID].Character_CUT_DEF;
    userData[playerID].Character_POKE_DMG = player_Original_Hunt_data[playerID].Character_POKE_DMG;
    userData[playerID].Character_POKE_DEF = player_Original_Hunt_data[playerID].Character_POKE_DEF;
    userData[playerID].Character_COLD_DMG = player_Original_Hunt_data[playerID].Character_COLD_DMG;
    userData[playerID].Character_COLD_DEF = player_Original_Hunt_data[playerID].Character_COLD_DEF;
    userData[playerID].Character_FIRE_DMG = player_Original_Hunt_data[playerID].Character_FIRE_DMG;
    userData[playerID].Character_FIRE_DEF = player_Original_Hunt_data[playerID].Character_FIRE_DEF;
    userData[playerID].Character_WOOD_DMG = player_Original_Hunt_data[playerID].Character_WOOD_DMG;
    userData[playerID].Character_WOOD_DEF = player_Original_Hunt_data[playerID].Character_WOOD_DEF;
    userData[playerID].Character_LIGHT_DMG = player_Original_Hunt_data[playerID].Character_LIGHT_DMG;
    userData[playerID].Character_LIGHT_DEF = player_Original_Hunt_data[playerID].Character_LIGHT_DEF;
    userData[playerID].Character_BRIGHT_DMG = player_Original_Hunt_data[playerID].Character_BRIGHT_DMG;
    userData[playerID].Character_BRIGHT_DEF = player_Original_Hunt_data[playerID].Character_BRIGHT_DEF;
    userData[playerID].Character_DARK_DMG = player_Original_Hunt_data[playerID].Character_DARK_DMG;
    userData[playerID].Character_POISON_DMG = player_Original_Hunt_data[playerID].Character_POISON_DMG;
    userData[playerID].Character_POISON_DEF = player_Original_Hunt_data[playerID].Character_POISON_DEF;
    userData[playerID].Character_Status1 = player_Original_Hunt_data[playerID].Character_Status1;
    userData[playerID].Character_Status2 = player_Original_Hunt_data[playerID].Character_Status2;
    userData[playerID].Character_Status3 = player_Original_Hunt_data[playerID].Character_Status3;
    userData[playerID].Character_Status4 = player_Original_Hunt_data[playerID].Character_Status4;
    userData[playerID].Character_Status5 = player_Original_Hunt_data[playerID].Character_Status5;
    userData[playerID].Character_Status6 = player_Original_Hunt_data[playerID].Character_Status6;
}


module.exports = class fight_reward {
    constructor() {
        this.name = 'hreward',
            this.alias = ['狩獵獎勵', 'hre'],
            this.usage = '!hreward'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        let playerHunt_Data = player_Hunt[playerID];

        let Random_Number = function () {
            return Math.floor(Math.random() * 100) + 1;
        }
        
        let isSuccessful = function () {
            var Failed_Value = 100;
            if (playerHunt_Data.FightMonster_FightHP <= 0) {
                Failed_Value = 0;
                console.log("失敗率: " + Failed_Value)
                if (Random_Number() > Failed_Value) {
                    console.log("狩獵成功")
                    return true
                } else {
                    console.log("狩獵失敗")
                    return false
                }
            } else {
                Failed_Value = (playerHunt_Data.FightMonster_FightHP / playerHunt_Data.FightMonster_TotalHP) * 100;
                console.log("失敗率: " + Failed_Value)
                if (Random_Number() > Failed_Value) {
                    console.log("狩獵成功")
                    return true
                } else {
                    console.log("狩獵失敗")
                    return false
                }
            }

        }

        let isPlayer_Dead = function(){
            if (userData[playerID].Character_HP <= 0){
                return true;
            }
        }

        if(isPlayer_Dead()){
            player_Hunt_reset(playerID);
            return message.reply(`你似乎已經死亡了...請輸入!revive`).then(msg => {
                msg.delete(10000)
            });
        }
        console.log(`使用者(ID: ${playerID})使用「戰鬥獎勵」`)
        let pass_time = Math.round(Math.abs(playerHunt_Data.Monster_Time - (message.createdAt / 1000)));
        let actual_time = formatSecond(pass_time);
        let need_time = formatSecond(playerHunt_Data.Monster_Need_Time);
        if (playerHunt_Data.isFightMonster === false) return message.reply("你還未參與任何狩獵活動").then(msg => {
            msg.delete(10000)
        });

        if (pass_time > playerHunt_Data.Monster_Need_Time) {
            if (isSuccessful()) {
                let getMoney = loots_money.lootMoney(playerHunt_Data.Monster_ID);
                userData[playerID].Character_Money += getMoney * playerHunt_Data.Monster_Number; //得到金錢
                console.log(`使用者(ID: ${playerID})已取得金錢${getMoney}元`)

                let getExp = loots_exp.lootExp(playerHunt_Data.Monster_ID);
                userData[playerID].Character_Exp += getExp * playerHunt_Data.Monster_Number; //得到Exp
                console.log(`使用者(ID: ${playerID})已取得經驗${getExp}元`)


                let getitem = loots_item.lootItem(playerID);
                console.log(`使用者(ID: ${playerID})已取得道具${getitem}`)

                if (invfull(inv[playerID], playerID) == "full") {
                    message.reply("你的背包已滿，請清理後再進行冒險，以免無法獲得道具.").then(msg => {
                        msg.delete(10000)
                    });
                }
                message.reply(`金幣獎勵「${getMoney}元」已獲得.\n經驗獎勵「${getExp}」已獲得.\n道具獎勵「${getitem}」已獲得.`).then(msg => {
                    msg.delete(10000)
                });
                player_Hunt_reset(playerID);
            } else {
                message.reply("狩獵失敗，扣除100HP.").then(msg => {
                    msg.delete(10000)
                });
                userData[playerID].Character_HP -= 100;
                player_Hunt_reset(playerID);
            }
            fs.writeFile("./players_adventure_time.json", JSON.stringify(player_Hunt), (err) => {});

            fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});

            fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

            fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) => {});
        } else {
            message.reply(`狩獵中，挑戰狩獵時間：${need_time}，狩獵已過的時間：${actual_time}\n你可以藉由使用技能，使狩獵成功率增加`).then(msg => {
                msg.delete(10000)
            });

        }


    }
}