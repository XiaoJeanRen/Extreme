const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_fightNow_Monster = require("../dungeon_players_fight.json");
const character_equip_info = require("../character_equip.json");
const equip = require("../all_item_id_data.json");
const fightMonster = require("../monster_data.json");
//查看角色狀態指令

module.exports = class fight_monster {
    constructor() {
        this.name = 'fightSkill',
            this.alias = ['使用技能', 'fs'],
            this.usage = '!fightSkill'
    }

    async run(bot, message, args) {
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        let Player_info = userData[playerID];
        let Player_Equip_info = character_equip_info[playerID];
        let Monster_info = player_fightNow_Monster[playerID];
        let fight_Skill = args[1];
        let fight_Target = args[2];
        if (!args[1] || !args[2]) return message.reply("指令錯誤，請輸入!fight (普攻/技能/狀態/逃跑)").then(msg => {
            msg.delete(1000)
        });

        let Random_Fight_Number = function () {
            return Math.floor(Math.random() * 100) + 1;
        }
        let check_CommonAttack_Weapon_Type = function () {
            if (equip[Player_Equip_info.Weapon1].Equip_Shape == "單手劍" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "長柄武器" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "弓弩" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "匕首"
            ) {
                return "刺"
            } else if (equip[Player_Equip_info.Weapon1].Equip_Shape == "巨斧" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "單手刀" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "單手斧"
            ) {
                return "斬"
            } else if (equip[Player_Equip_info.Weapon1].Equip_Shape == "雙手鈍器" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "拳套" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "單手鈍器" ||
                equip[Player_Equip_info.Weapon1].Equip_Shape == "杖"
            ) {
                return "打"
            } else {
                return "無"
            }
        }
        let isMiss = function () {
            let Player_AND_Monster_Level_Difference = Player_info.Character_Level - Monster_info.monster1.Monster_Level;
            console.log("等差:" + Player_AND_Monster_Level_Difference)
            if (Player_AND_Monster_Level_Difference >= 10) {
                console.log("比怪物大10等")
                let Player_Total_Accurate = 85 + Player_info.Character_Accurate;
                console.log("玩家命中率：" + Player_Total_Accurate)
                if (Random_Fight_Number() < Player_Total_Accurate) {
                    return true;
                } else {
                    return false;
                }
            } else if (Player_AND_Monster_Level_Difference < 10 && Player_AND_Monster_Level_Difference > -5) {
                console.log("比怪物大或小5等")
                let Player_Total_Accurate = 70 + Player_info.Character_Accurate;
                console.log("玩家命中率：" + Player_Total_Accurate)
                if (Random_Fight_Number() < Player_Total_Accurate) {
                    return true;
                } else {
                    return false;
                }
            } else {
                console.log("比怪物小10等")
                let Player_Total_Accurate = 50 + Player_info.Character_Accurate;
                console.log("玩家命中率：" + Player_Total_Accurate)
                if (Random_Fight_Number() < Player_Total_Accurate) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        let CommonAttack = function () {
            let Weapon_Type = check_CommonAttack_Weapon_Type();
            console.log("使用武器屬性為: " + Weapon_Type);
            if (Weapon_Type == "刺") {
                if (Player_info.Character_POKE_DMG > Monster_info.monster1.Mosnter_POKE_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.monster1.Mosnter_DEF) * 1.2;
                    console.log("觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.monster1.Mosnter_DEF);
                    console.log("未觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Weapon_Type == "斬") {
                if (Player_info.Character_CUT_DMG > Monster_info.monster1.Mosnter_CUT_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.monster1.Mosnter_DEF) * 1.2;
                    console.log("觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.monster1.Mosnter_DEF);
                    console.log("未觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Weapon_Type == "打") {
                if (Player_info.Character_HIT_DMG > Monster_info.monster1.Mosnter_HIT_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.monster1.Mosnter_DEF) * 1.2;
                    console.log("觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.monster1.Mosnter_DEF);
                    console.log("未觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            }
        }
        let isSkillCanUse = function () {

        }

        message.reply("請輸入你想使用的「技能代號」，輸入cancel取消").then(msg => {
            msg.delete(20000)
        });
        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000
        }).then(collection => {
            let UseSkill = collection.first().content;
            if (!collection.first().content) return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            if (UseSkill == "cancel") return message.reply("取消").then(msg => {
                msg.delete(5000)
            });

            switch (UseSkill) {
                case '技能1001':
                    isSkillCanUse();
                    message.reply("成功")
                    break;
            }


        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        });



    }
}