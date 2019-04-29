const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const adv_time = require("../players_adventure_time.json");
const player_hunt = require("../players_hunt_monster.json");
//創建復活指令
module.exports = class revive_Character {
    constructor() {
        this.name = 'revive',
            this.alias = ['復活', '角色復活'],
            this.usage = '!revive'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let player_Info = userData[playerID];
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        if (player_Info.Character_HP > 0) return message.reply("你不需要復活").then(msg => {
            msg.delete(5000)
        });
        console.log(`使用者(ID: ${playerID})使用「角色復活」`)
        message.reply("開始進行復活，(完全復活5W金/普通復活5K金/殘缺復活0金)，輸入cancel取消.\n完美復活「不扣除任何經驗值，HP、MP、AP全滿」\n普通復活「扣除5K經驗值，HP、MP、AP回復一半」\n殘缺復活「經驗值是下次升級負的一半、HP、MP、AP為1」");
        const filter = m => m.author.id === message.author.id;



        message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000
        }).then(collection => {
            let reviveChoose = collection.first().content;
            if (!collection.first().content) return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            if (reviveChoose == "cancel") return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            if (reviveChoose == "完美復活") {
                if (player_Info.Character_Money < 50000) {
                    return message.reply("金錢不足").then(msg => {
                        msg.delete(5000)
                    });
                }
                player_Info.Money -= 50000;
                player_Info.Character_HP = (player_Info.Character_MaxHP);
                player_Info.Character_AP = (player_Info.Character_MaxMP);
                player_Info.Character_AP = (player_Info.Character_MaxAP);
                message.reply("復活成功").then(msg => {
                    msg.delete(5000)
                });
            } else if (reviveChoose == "普通復活") {
                if (player_Info.Character_Money < 5000) {
                    return message.reply("金錢不足").then(msg => {
                        msg.delete(5000)
                    });
                }
                player_Info.Money -= 5000;
                player_Info.Character_Exp -= 5000;
                player_Info.Character_HP = (player_Info.Character_MaxHP / 2);
                player_Info.Character_MP = (player_Info.Character_MaxMP / 2);
                player_Info.Character_AP = (player_Info.Character_MaxAP / 2);
                message.reply("復活成功").then(msg => {
                    msg.delete(5000)
                });
            } else if (reviveChoose == "殘缺復活") {
                player_Info.Character_Exp -= (player_Info.Character_Level * 300 * 2.5) / 2;
                player_Info.Character_HP = 1;
                player_Info.Character_MP = 1;
                player_Info.Character_AP = 1;
                message.reply("復活成功").then(msg => {
                    msg.delete(5000)
                });
            } else {
                return message.reply("取消").then(msg => {
                    msg.delete(5000)
                });
            }



            adv_time[message.author.id] = {
                isAdventure: false,
                adventure_id: "000",
                adventure_place: "無",
                adventure_time: 0,
                need_time: 0
            }

            player_hunt[message.author.id] = {
                Monster_Name: "無",
                Monster_ID: "無",
                Monster_Number: 0,
                Monster_Time: 0,
                Monster_Need_Time: 0,
                Fight_place: "無",
                isFightMonster: false,
                FightMonster: "尚未狩獵",
                FightMonster_TotalHP: 0,
                FightMonster_FightHP: 0
            }

        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        });
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

        fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) => {});

        fs.writeFile("./players_hunt_monster.json", JSON.stringify(player_hunt), (err) => {});

    }

}