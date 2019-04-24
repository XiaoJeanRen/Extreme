const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const fightMonster = require("../monster_data.json");
//查看角色狀態指令

module.exports = class fight_monster {
    constructor() {
        this.name = 'fight',
            this.alias = ['戰鬥'],
            this.usage = '!fight'
    }

    async run(bot, message, args) {
        
        let playerID = message.author.id;
        let player_info = userData[playerID];
        if (!args[1]) return message.reply("請輸入正確的怪物ID不存在").then(msg => {
            msg.delete(1000)
        });
        let monsetrID = args[1];
        let monster_info = fightMonster[monsetrID];
        if (!monster_info) return message.reply("此怪物ID不存在").then(msg => {
            msg.delete(1000)
        });
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        message.reply(`你即將挑戰怪物「${monster_info.monsterName}」你確定嗎(▶開始 / ⏸取消)`).then(msg => {
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
                    let fightEmbed = new Discord.RichEmbed()
                    .addField("玩家：" + player_info.userName,
                    "角色HP：" + player_info.hp + "/" + player_info.max_Hp + "\n" +
                    "角色MP：" + player_info.mp + "/" + player_info.max_Mp + "\n" +
                    "角色AP：" + player_info.ap + "/" + player_info.max_Ap + "\n" +
                    "角色攻擊力：" + player_info.atk + "\n" +
                    "角色防禦力：" + player_info.def + "\n" +
                    "角色異常狀態：" + player_info.status + "\n"
                    )
                    .addField("敵人：" + monster_info.monsterName,
                    "敵人HP：" + monster_info.monster_Hp + "\n" +
                    "敵人MP：" + monster_info.monster_Mp + "\n" +
                    "敵人AP：" + monster_info.monster_Ap + "\n" 
                    )
                    message.reply(fightEmbed);
                } else if (reaction.emoji.name === '⏸'){
                    let escapeEmbed = new Discord.RichEmbed()
                    .addField("BAD END","滾啦 嫩B")

                    message.reply(escapeEmbed);
                }
            })
            .catch(collected => {
                console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
            });
        

        
            await message.delete(6000);
    }
}