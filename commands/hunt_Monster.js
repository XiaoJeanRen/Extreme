const Discord = require("discord.js");
const fs = require("fs");
const userData = require("../players_data.json");
const Monster_Data = require("../all_monster_data.json");
const player_Hunt = require("../players_hunt_monster.json");
const player_Original_Hunt_data = require("../players_original_fight_data.json");
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
        let player_Info = userData[playerID];
        let playerHunt = player_Hunt[playerID];
        
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        if (userData[playerID].Character_HP <= 0) return message.reply("你似乎已經死亡了...請輸入!revive").then(msg => {
            msg.delete(1000)
        });
        if (playerHunt.isFightMonster) return message.reply("你已經在狩獵中了.").then(msg => {
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
            return message.reply("魔物不存在.").then(msg => {
                msg.delete(10000)
            });
        }


        player_Original_Hunt_data[playerID] = {
            Character_Str: player_Info.Character_Str,
            Character_Int: player_Info.Character_Int,
            Character_Dex: player_Info.Character_Dex,
            Character_Acc: player_Info.Character_Acc,
            Character_DMG: player_Info.Character_DMG,
            Character_DEF: player_Info.Character_DEF,
            Character_M_DMG: player_Info.Character_M_DMG,
            Character_M_Def: player_Info.Character_M_Def,
            Character_Strike: player_Info.Character_Strike,
            Character_Accurate: player_Info.Character_Accurate,
            Character_Taunt: player_Info.Character_Taunt,
            Character_HIT_DMG: player_Info.Character_HIT_DMG,
            Character_HIT_DEF: player_Info.Character_HIT_DEF,
            Character_CUT_DMG: player_Info.Character_CUT_DMG,
            Character_CUT_DEF: player_Info.Character_CUT_DEF,
            Character_POKE_DMG: player_Info.Character_POKE_DMG,
            Character_POKE_DEF: player_Info.Character_POKE_DEF,
            Character_COLD_DMG: player_Info.Character_COLD_DMG,
            Character_COLD_DEF: player_Info.Character_COLD_DEF,
            Character_FIRE_DMG: player_Info.Character_FIRE_DMG,
            Character_FIRE_DEF: player_Info.Character_FIRE_DEF,
            Character_WOOD_DMG: player_Info.Character_WOOD_DMG,
            Character_WOOD_DEF: player_Info.Character_WOOD_DEF,
            Character_LIGHT_DMG: player_Info.Character_LIGHT_DMG,
            Character_LIGHT_DEF: player_Info.Character_LIGHT_DEF,
            Character_BRIGHT_DMG: player_Info.Character_BRIGHT_DMG,
            Character_BRIGHT_DEF: player_Info.Character_BRIGHT_DEF,
            Character_DARK_DMG: player_Info.Character_DARK_DMG,
            Character_DARK_DEF: player_Info.Character_DARK_DEF,
            Character_POISON_DMG: player_Info.Character_POISON_DMG,
            Character_POISON_DEF: player_Info.Character_POISON_DEF,
            Character_Status1: "無",
            Character_Status2: "無",
            Character_Status3: "無",
            Character_Status4: "無",
            Character_Status5: "無",
            Character_Status6: "無"
        }


        fs.writeFile("./players_original_fight_data.json", JSON.stringify(player_Original_Hunt_data), (err) => {
        });
        fs.writeFile("./players_hunt_monster.json", JSON.stringify(player_Hunt), (err) => {
        });
    }
}