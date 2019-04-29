const Discord = require("discord.js");
const fs = require("fs");
const userData = require("../players_data.json");
const Monster_Data = require("../all_monster_data.json");
const player_Hunt = require("../players_hunt_monster.json");
//查看副本地圖指令
module.exports = class monsters {
    constructor() {
        this.name = 'hunt',
            this.alias = ['狩獵'],
            this.usage = '!hunt'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        if (playerHunt_Data.isFightMonster) return message.reply("你已經在狩獵中了.").then(msg => {
            msg.delete(10000)
        });
        console.log(`使用者(ID: ${playerID})使用「魔物狩獵」`)
        let MonsetrID = args[1];
        let MonsetrNumber = args[2];
        if (!args[1]) return message.reply("沒有輸入怪物ID.").then(msg => {
            msg.delete(10000)
        });
        if (!args[2]) return message.reply("沒有輸入魔物數量.").then(msg => {
            msg.delete(10000)
        });
        /*if (playerHunt.isFightMonster == "戰鬥開始") return message.reply("你已經在戰鬥了，輸入!ht查看戰鬥時間.").then(msg => {
            msg.delete(10000)
        });*/
        let MonsterData = Monster_Data[MonsetrID];
        let playerHunt = player_Hunt[playerID];
        let adventure_time = (message.createdAt / 1000);
        switch (MonsetrID) {
            case '1000':
                playerHunt.Monster_Name = MonsterData.Monster_Name;
                playerHunt.Monster_ID = "1000";
                playerHunt.Monster_Number = parseInt(MonsetrNumber);
                playerHunt.Monster_Time = adventure_time;
                playerHunt.Monster_Need_Time = 60 * MonsetrNumber;
                playerHunt.Fight_place = "無";
                playerHunt.isFightMonster = true;
                playerHunt.FightMonster = "正在狩獵";
                playerHunt.FightMonster_TotalHP = MonsterData.Monster_HP * MonsetrNumber;
                playerHunt.FightMonster_FightHP = MonsterData.Monster_HP * MonsetrNumber;
                message.reply("狩獵開始，輸入!ht查看時間，輸入!hreward獲得獎勵.").then(msg => {
                    msg.delete(10000)
                });
                break;
            default:
            return message.reply("怪物不存在.").then(msg => {
                msg.delete(10000)
            });
        }
        fs.writeFile("./players_hunt_monster.json", JSON.stringify(player_Hunt), (err) => {
        });
    }
}