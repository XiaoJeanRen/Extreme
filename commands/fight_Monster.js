const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_fightNow_Monster = require("../dungeon_players_fight.json");
const fightMonster = require("../monster_data.json");
//查看角色狀態指令
let comonatkCheck = function (playerID){
    player_fightNow_Monster[playerID].monster1.monster_Hp -= userData[playerID].atk;
    //console.log(player_fightNow_Monster[playerID].monster1.monster_Hp)
    if(player_fightNow_Monster[playerID].monster1.monster_Hp <= 0){
        player_fightNow_Monster[playerID].monster1 = 0;
        fs.writeFile("./dungeon_players_fight.json", JSON.stringify(player_fightNow_Monster), (err) => {});
        return "怪物死亡";
    }
    
}
module.exports = class fight_monster {
    constructor() {
        this.name = 'fight',
            this.alias = ['戰鬥'],
            this.usage = '!fight'
    }

    async run(bot, message, args) {
        
        let playerID = message.author.id;
        let player_info = userData[playerID];
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        message.react('▶').then(() => message.react('⏸'));
        const filter = (reaction, user) => {
            return ['▶', '⏸'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        
        message.awaitReactions(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            })
            .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '▶') {
                    comonatkCheck(playerID);
                    message.reply("你使用普通攻擊");
                    
                } else if (reaction.emoji.name === '⏸') {
                    message.reply("delete");
                }
            })
            .catch(collected => {
                console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
            });
            message.reply(`你即將挑戰怪物你確定嗎(▶開始 / ⏸取消)`).then(msg => {
                msg.delete(1000)
            });
            
            //console.log(ask());
        
        await message.delete(10000);
    }
}