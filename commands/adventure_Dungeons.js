const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const dun_fight_Monster = require("../dungeon_players_fight.json");
const fightMonster = require("../monster_data.json");
//查看角色狀態指令

let chooseEvent = function (playerID, pick_Dun_Floor) {
    let eventNumber = Math.floor(Math.random() * 2) + 2;
    if (eventNumber == 1) {
        break;
    } else if (eventNumber == 2) {
        chooseMonster(playerID, pick_Dun_Floor);
    }
}

let ismonsterGroup = function (playerID, monsterGroup, monsterNumber) {
    console.log("isMonster")
    if (monsterGroup == 1) {
        dun_fight_Monster[playerID].monster1 = fightMonster[monsterNumber];
    } else if (monsterGroup == 2) {
        dun_fight_Monster[playerID].monster1 = fightMonster[monsterNumber];
        dun_fight_Monster[playerID].monster2 = fightMonster[monsterNumber];
    } else {
        dun_fight_Monster[playerID].monster1 = fightMonster[monsterNumber];
        dun_fight_Monster[playerID].monster2 = fightMonster[monsterNumber];
        dun_fight_Monster[playerID].monster3 = fightMonster[monsterNumber];
    }
    fs.writeFile("./dungeon_players_fight.json", JSON.stringify(dun_fight_Monster), (err) => {});
    fs.writeFile("./monster_data.json", JSON.stringify(fightMonster), (err) => {});
}

let chooseMonster = function (playerID, pick_Dun_Floor) {
    switch (pick_Dun_Floor) {
        case '1':
            console.log("pick")
            let monsterGroup = Math.floor(Math.random() * 1) + 1;
            let monsterNumber = Math.floor(Math.random() * 1) + 1;
            ismonsterGroup(playerID, monsterGroup, monsterNumber);

        default:
            break;
    }
}

module.exports = class fight_monster {
    constructor() {
        this.name = 'dun',
            this.alias = ['地下城探險', 'dungeon'],
            this.usage = '!dun'
    }

    async run(bot, message, args) {

        let playerID = message.author.id;
        let player_info = userData[playerID];
        let pick_Dun_Floor = args[1];
        if (!args[1]) return message.reply("ERROR");
        let monster_info = dun_fight_Monster[playerID];
        message.reply(`你選擇「地下城探險」你確定嗎(▶開始 / ⏸取消)`).then(msg => {
            msg.delete(20000)
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
                    //let eventNumber = Math.floor(Math.random() * 2) + 2;
                    let eventNumber = 2;
                    if (eventNumber == 1) {
                        return message.reply("1");
                    } else if (eventNumber == 2) {
                        console.log(playerID)
                        console.log(pick_Dun_Floor)
                        chooseMonster(playerID, pick_Dun_Floor);
                        let dataEmbed = new Discord.RichEmbed()
                        .addField("玩家：" + player_info.userName,
                            "角色HP：" + player_info.hp + "/" + player_info.max_Hp + "\n" +
                            "角色MP：" + player_info.mp + "/" + player_info.max_Mp + "\n" +
                            "角色AP：" + player_info.ap + "/" + player_info.max_Ap + "\n" +
                            "角色攻擊力：" + player_info.atk + "\n" +
                            "角色防禦力：" + player_info.def + "\n" +
                            "角色異常狀態：" + player_info.status + "\n"
                        )
                        .addField("敵人1：" + monster_info.monster1.monsterName,
                            "敵人1_HP：" + monster_info.monster1.monster_Hp + "\n" +
                            "敵人1_MP：" + monster_info.monster1.monster_Mp + "\n" +
                            "敵人1_AP：" + monster_info.monster1.monster_Ap + "\n"
                        )
                        message.reply(dataEmbed);
                    } else {
                        console.log(playerID)
                    }
                    message.reply("HEY");

                } else if (reaction.emoji.name === '⏸') {
                    message.reply("delete");
                }
            })
            .catch(collected => {
                console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
            });
        await message.delete(10000);


    }
}