const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_fightNow_Monster = require("../dungeon_players_fight.json");
const fightMonster = require("../monster_data.json");
const dun_fight_Monster = require("../dungeon_players_fight.json");
//查看角色狀態指令

module.exports = class fight_monster {
    constructor() {
        this.name = 'ss',
            this.alias = ['模擬'],
            this.usage = '!ss'
    }

    async run(bot, message, args) {
        let playerID = message.author.id;
        let player_info = userData[playerID];
        let player_battle = player_fightNow_Monster[playerID];
        let isMiss = function () {
            //命中判斷
            //玩家 - 怪物 的等差
            let level_difference = player_info.level - player_battle.monster1.monster_Level;
            console.log("level_diff= " + level_difference)
            if (level_difference > 10) {
                console.log(">10")
                console.log("OVER LEVEL")
                return true;
            } else if (level_difference >= 5 && level_difference < 10) {
                console.log("5 ~ 10")
                let playerAcc = (player_info.dex / 2) + player_info.acc;
                let monsterAvoid = player_battle.monster1.mosnter_Avoid_Chance + (player_battle.monster1.monster_Ap / 10);
                console.log(playerAcc)
                console.log(player_battle.monster1.mosnter_Avoid_Chance)
                let miss = (10 + (level_difference * 10)) + playerAcc - monsterAvoid;
                console.log(miss);
                let chance = Math.floor(Math.random() * 100) + 1;
                console.log(chance)
                if (chance <= miss) {
                    return true
                } else {
                    return false
                }
            } else if (level_difference < 5 && level_difference >= -5) {
                console.log("5 ~ -5")
                let playerAcc = (player_info.dex / 2) + player_info.acc;
                level_difference = Math.abs(level_difference)
                let monsterAvoid = player_battle.monster1.mosnter_Avoid_Chance + (player_battle.monster1.monster_Ap / 10);
                console.log(playerAcc)
                console.log(player_battle.monster1.mosnter_Avoid_Chance)
                let miss = (30 + (level_difference * 4.5)) + playerAcc - monsterAvoid;
                console.log(miss);
                let chance = Math.floor(Math.random() * 100) + 1;
                console.log(chance)
                if (chance <= miss) {
                    return true
                } else {
                    return false
                }
            } else {
                console.log("-6 <")
                let playerAcc = (player_info.dex / 2) + player_info.acc;
                let monsterAvoid = player_battle.monster1.mosnter_Avoid_Chance + (player_battle.monster1.monster_Ap / 10);
                console.log(playerAcc)
                console.log(player_battle.monster1.mosnter_Avoid_Chance)
                let miss = 30 + playerAcc - monsterAvoid;
                console.log(miss);
                let chance = Math.floor(Math.random() * 100) + 1;
                console.log(chance)
                if (chance <= miss) {
                    return true
                } else {
                    return false
                }
            }
        }
        let isweek = function () {
            //弱點判斷
            if (player_info.fight_hit_Damage > player_battle.mosnter_Hit_Resistance ||
                player_info.fight_cut_Damage > player_battle.mosnter_Cut_Resistance ||
                player_info.fight_poke_Damage > player_battle.mosnter_Poke_Resistance
            ) {
                console.log("弱點突破")
                return true
            }else{
                console.log("弱點未突破")
                return false
            }
        }
        let countWeekDamage = function () {
            let totalDamage = 0;
            (player_info.atk)
           
        }

        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        let attackType = args[1];
        if (!args[1]) return message.reply("指令錯誤").then(msg => {
            msg.delete(1000)
        });
        let skillid = args[2];

        switch (attackType) {
            case 's':
                let totalDamage = 0;
                if (isMiss()) {
                    console.log("攻擊成功")
                    if(isweek()){
                        countWeekDamage();
                    }else{

                    }
                    
                } else {
                    console.log("攻擊失敗")
                }
        }

    }
}