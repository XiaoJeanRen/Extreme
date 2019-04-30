const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const adv_time = require("../players_adventure_time.json");
const player_hunt = require("../players_hunt_monster.json");
const player_Original_Hunt_data = require("../players_original_fight_data.json");
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
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        if (player_Info.Character_HP > 0) return message.reply("你不需要復活").then(msg => {
            msg.delete(5000)
        });
        console.log(`使用者(ID: ${playerID})使用「角色復活」`)
        message.reply("開始進行復活，(完全復活5W金/普通復活5K金/殘缺復活0金)，輸入cancel取消.\n完美復活「不扣除任何經驗值，HP、MP、AP全滿」\n普通復活「扣除5K經驗值，HP、MP、AP回復一半」\n殘缺復活「經驗值是下次升級負的一半、HP、MP、AP為1」").then(msg => {
            msg.delete(10000)
        });

        let playerReset = function () {
            player_Info.Character_Adventure = "尚未冒險";
            player_Info.Character_Hunt = "尚未狩獵";
            player_Info.Character_Str = player_Original_Hunt_data[playerID].Character_Str;
            player_Info.Character_Int = player_Original_Hunt_data[playerID].Character_Int;
            player_Info.Character_Dex = player_Original_Hunt_data[playerID].Character_Dex;
            player_Info.Character_Acc = player_Original_Hunt_data[playerID].Character_Acc;
            player_Info.Character_DMG = player_Original_Hunt_data[playerID].Character_DMG;
            player_Info.Character_DEF = player_Original_Hunt_data[playerID].Character_DEF;
            player_Info.Character_M_DMG = player_Original_Hunt_data[playerID].Character_M_DMG;
            player_Info.Character_M_Def = player_Original_Hunt_data[playerID].Character_M_Def;
            player_Info.Character_Strike = player_Original_Hunt_data[playerID].Character_Strike;
            player_Info.Character_Accurate = player_Original_Hunt_data[playerID].Character_Accurate;
            player_Info.Character_Taunt = player_Original_Hunt_data[playerID].Character_Taunt;
            player_Info.Character_HIT_DMG = player_Original_Hunt_data[playerID].Character_HIT_DMG;
            player_Info.Character_HIT_DEF = player_Original_Hunt_data[playerID].Character_HIT_DEF;
            player_Info.Character_CUT_DMG = player_Original_Hunt_data[playerID].Character_CUT_DMG;
            player_Info.Character_CUT_DEF = player_Original_Hunt_data[playerID].Character_CUT_DEF;
            player_Info.Character_POKE_DMG = player_Original_Hunt_data[playerID].Character_POKE_DMG;
            player_Info.Character_POKE_DEF = player_Original_Hunt_data[playerID].Character_POKE_DEF;
            player_Info.Character_COLD_DMG = player_Original_Hunt_data[playerID].Character_COLD_DMG;
            player_Info.Character_COLD_DEF = player_Original_Hunt_data[playerID].Character_COLD_DEF;
            player_Info.Character_FIRE_DMG = player_Original_Hunt_data[playerID].Character_FIRE_DMG;
            player_Info.Character_FIRE_DEF = player_Original_Hunt_data[playerID].Character_FIRE_DEF;
            player_Info.Character_WOOD_DMG = player_Original_Hunt_data[playerID].Character_WOOD_DMG;
            player_Info.Character_WOOD_DEF = player_Original_Hunt_data[playerID].Character_WOOD_DEF;
            player_Info.Character_LIGHT_DMG = player_Original_Hunt_data[playerID].Character_LIGHT_DMG;
            player_Info.Character_LIGHT_DEF = player_Original_Hunt_data[playerID].Character_LIGHT_DEF;
            player_Info.Character_BRIGHT_DMG = player_Original_Hunt_data[playerID].Character_BRIGHT_DMG;
            player_Info.Character_BRIGHT_DEF = player_Original_Hunt_data[playerID].Character_BRIGHT_DEF;
            player_Info.Character_DARK_DMG = player_Original_Hunt_data[playerID].Character_DARK_DMG;
            player_Info.Character_POISON_DMG = player_Original_Hunt_data[playerID].Character_POISON_DMG;
            player_Info.Character_POISON_DEF = player_Original_Hunt_data[playerID].Character_POISON_DEF;
            player_Info.Character_Status1 = player_Original_Hunt_data[playerID].Character_Status1;
            player_Info.Character_Status2 = player_Original_Hunt_data[playerID].Character_Status2;
            player_Info.Character_Status3 = player_Original_Hunt_data[playerID].Character_Status3;
            player_Info.Character_Status4 = player_Original_Hunt_data[playerID].Character_Status4;
            player_Info.Character_Status5 = player_Original_Hunt_data[playerID].Character_Status5;
            player_Info.Character_Status6 = player_Original_Hunt_data[playerID].Character_Status6;
        }

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
                player_Info.Character_Money -= 50000;
                player_Info.Character_HP = (player_Info.Character_MaxHP);
                player_Info.Character_MP = (player_Info.Character_MaxMP);
                player_Info.Character_AP = (player_Info.Character_MaxAP);


                playerReset();
                message.reply("復活成功").then(msg => {
                    msg.delete(5000)
                });
            } else if (reviveChoose == "普通復活") {
                if (player_Info.Character_Money < 5000) {
                    return message.reply("金錢不足").then(msg => {
                        msg.delete(5000)
                    });
                }
                player_Info.Character_Money -= 5000;
                player_Info.Character_Exp -= 5000;
                player_Info.Character_HP = (player_Info.Character_MaxHP / 2);
                player_Info.Character_MP = (player_Info.Character_MaxMP / 2);
                player_Info.Character_AP = (player_Info.Character_MaxAP / 2);
                playerReset();
                message.reply("復活成功").then(msg => {
                    msg.delete(5000)
                });
            } else if (reviveChoose == "殘缺復活") {
                player_Info.Character_Exp -= (player_Info.Character_Level * 300 * 2.5) / 2;
                player_Info.Character_HP = 1;
                player_Info.Character_MP = 1;
                player_Info.Character_AP = 1;
                playerReset();
                message.reply("復活成功").then(msg => {
                    msg.delete(5000)
                });
            } else if (reviveChoose == "GM復活" && message.author.id == config.gm) {
                player_Info.Character_Money += 50000;
                player_Info.Character_HP = player_Info.Character_MaxHP;
                player_Info.Character_MP = player_Info.Character_MaxMP;
                player_Info.Character_AP = player_Info.Character_MaxAP;
                playerReset();
                message.reply("GM復活成功").then(msg => {
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
            fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

            fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) => {});

            fs.writeFile("./players_hunt_monster.json", JSON.stringify(player_hunt), (err) => {});
        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        });


    }

}