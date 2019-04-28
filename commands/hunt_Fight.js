const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_Skill = require("../players_skills.json");
const hunt_Monster = require("../players_hunt_monster.json");
const hunt_MonsterData = require("../all_monster_data.json");
const character_equip_info = require("../character_equip.json");
const equip = require("../all_item_id_data.json");
//查看角色狀態指令

module.exports = class hunt_fight {
    constructor() {
        this.name = 'huntfight',
            this.alias = ['hf', 'huntFight', '狩獵操作','HF'],
            this.usage = '!huntfight'
    }

    async run(bot, message, args) {
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        let huntID = hunt_Monster[playerID].Monster_ID;
        //console.log(huntID)
        let Player_info = userData[playerID];
        let Player_Equip_info = character_equip_info[playerID];
        let Player_Skill_info = player_Skill[playerID];
        let Monster_info = hunt_MonsterData[huntID];
        //console.log(Monster_info)
        let fight_Type = args[1];
        if (!args[1]) return message.reply("指令錯誤，請輸入!hf (普攻/技能/狀態/逃跑)").then(msg => {
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
            let Player_AND_Monster_Level_Difference = Player_info.Character_Level - Monster_info.Monster_Level;
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
                if (Player_info.Character_POKE_DMG > Monster_info.Mosnter_POKE_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF) * 1.2;
                    console.log("觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF);
                    console.log("未觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Weapon_Type == "斬") {
                if (Player_info.Character_CUT_DMG > Monster_info.Mosnter_CUT_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF) * 1.2;
                    console.log("觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF);
                    console.log("未觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Weapon_Type == "打") {
                if (Player_info.Character_HIT_DMG > Monster_info.Mosnter_HIT_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF) * 1.2;
                    console.log("觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF);
                    console.log("未觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else {
                let Player_Total_DMG = 1;
                console.log("未觸發任何屬性弱點攻擊，總傷害: " + Player_Total_DMG);
                return Player_Total_DMG
            }
        }

        let check_Skill_Extra_Damage = function(Player_Skill_info){
            return Player_Skill_info.Skill_Extra_DMG + 
            Player_Skill_info.Skill_Extra_M_DMG + 
            Player_Skill_info.Skill_Extra_FIRE_DMG +
            Player_Skill_info.Skill_Extra_COLD_DMG +
            Player_Skill_info.Skill_Extra_WOOD_DMG +
            Player_Skill_info.Skill_Extra_LIGHT_DMG +
            Player_Skill_info.Skill_Extra_BRIGHT_DMG +
            Player_Skill_info.Skill_Extra_DARK_DMG +
            Player_Skill_info.Skill_Extra_HIT_DMG +
            Player_Skill_info.Skill_Extra_CUT_DMG +
            Player_Skill_info.Skill_Extra_POKE_DMG +
            Player_Skill_info.Skill_Extra_POISON_DMG
        }

        let Monster_last_HP = function(){
            let Monster_TotalHP = hunt_Monster[playerID].FightMonster_TotalHP;
            let Monster_LastHP = hunt_Monster[playerID].FightMonster_FightHP;
            if (Monster_LastHP <= 0) {
                return "魔物們似乎已經倒下了..."
            } else if (Monster_LastHP <= 100 && Monster_LastHP > 0) {
                return "魔物們似乎已經瀕死..."
            } else if (Monster_LastHP > 100 && Monster_LastHP < Monster_TotalHP) {
                return "魔物們似乎還很亢奮..."
            }else{
                return "錯誤"
            }
        }

        let SkillAttack = function (Player_Skill_info) {
            let Skill_Extra_Damage = check_Skill_Extra_Damage(Player_Skill_info);
            let Skill_Type = Player_Skill_info.Skill_Type;
            let Monster_Total_DEF = (Monster_info.Mosnter_DEF+ Monster_info.Mosnter_M_DEF);
            let Skill_Attack_Damage = 1;
            if(Player_Skill_info.Skill_Attack_Type == "物理"){
                Skill_Attack_Damage = Player_info.Character_DMG;
            }else if(Player_Skill_info.Skill_Attack_Type == "魔法"){
                Skill_Attack_Damage = Player_info.Character_M_DMG;
            }else{
                Skill_Attack_Damage = 1;
            }
            console.log(Skill_Attack_Damage);
            console.log("使用技能屬性為: " + Skill_Type);
            if (Skill_Type == "火") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_FIRE_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_FIRE_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發火屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發火屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Skill_Type == "水") {
                console.log(Player_Skill_info.Skill_Add_COLD_DMG)
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_COLD_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_COLD_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發水屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發水屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Skill_Type == "木") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_WOOD_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_WOOD_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發木屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發木屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Skill_Type == "雷") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_LIGHT_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_LIGHT_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發雷屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發雷屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Skill_Type == "光") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_BRIGHT_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_BRIGHT_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發光屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發光屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Skill_Type == "暗") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_DARK_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_DARK_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發暗屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發暗屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else if (Skill_Type == "毒") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_POISON_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_POISON_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.2;
                    console.log("觸發毒屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸毒雷屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG
                }
            } else {
                let Player_Total_DMG = 1;
                console.log("未觸發任何屬性弱點攻擊，總傷害: " + Player_Total_DMG);
                return Player_Total_DMG
            }
        }
        let isSkillMiss = function (Skill_Add_Accurate) {
            let Player_AND_Monster_Level_Difference = Player_info.Character_Level - Monster_info.Monster_Level;
            console.log("等差:" + Player_AND_Monster_Level_Difference)
            if (Player_AND_Monster_Level_Difference >= 10) {
                console.log("比怪物大10等")
                let Player_Total_Accurate = 85 + Player_info.Character_Accurate + Skill_Add_Accurate;
                console.log("玩家命中率：" + Player_Total_Accurate)
                if (Random_Fight_Number() < Player_Total_Accurate) {
                    return true;
                } else {
                    return false;
                }
            } else if (Player_AND_Monster_Level_Difference < 10 && Player_AND_Monster_Level_Difference > -5) {
                console.log("比怪物大或小5等")
                let Player_Total_Accurate = 85 + Player_info.Character_Accurate + Skill_Add_Accurate;
                console.log("玩家命中率：" + Player_Total_Accurate)
                if (Random_Fight_Number() < Player_Total_Accurate) {
                    return true;
                } else {
                    return false;
                }
            } else {
                console.log("比怪物小10等")
                let Player_Total_Accurate = 85 + Player_info.Character_Accurate + Skill_Add_Accurate;
                console.log("玩家命中率：" + Player_Total_Accurate)
                if (Random_Fight_Number() < Player_Total_Accurate) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        switch (fight_Type) {
            case '普通攻擊':
            case '普攻':
                if (isMiss()) {
                    let Damage = CommonAttack();
                    message.reply("普通攻擊命中，傷害為" + Damage + "，" + Monster_last_HP());
                    console.log("普通攻擊命中")
                } else {
                    message.reply("普通攻擊未命中");
                    console.log("普通攻擊未命中")
                }
                


                break;
            case '使用技能':
            case '技能':
                message.reply("請輸入你想使用的「技能代號」，輸入cancel取消").then(msg => {
                    msg.delete(20000)
                });
                const filter = m => m.author.id === message.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 20000
                }).then(collection => {
                    let UseSkill = collection.first().content;
                    console.log(UseSkill)
                    /*if (!collection.first().content) return message.reply("取消").then(msg => {
                        msg.delete(5000)
                    });*/
                    /*if (UseSkill == "cancel") return message.reply("取消").then(msg => {
                        msg.delete(5000)
                    });*/
                    switch (UseSkill) {
                        case '技能1001':
                            if (Player_Skill_info.技能1001.Skill_isLearn == "尚未習得") {
                                return message.reply("技能尚未學習，無法使用").then(msg => {
                                    msg.delete(5000)
                                });
                            } else {
                                Player_Skill_info = Player_Skill_info.技能1001;
                               
                                if (isSkillMiss(Player_Skill_info.Skill_Add_Accurate)) {
                                    let Damage = SkillAttack(Player_Skill_info);
                                    message.reply("技能攻擊命中，傷害為" + Damage +"，"+ Monster_last_HP());
                                    console.log("技能攻擊命中")
                                } else {
                                    message.reply("技能攻擊未命中");
                                    console.log("技能攻擊未命中")
                                }
                                
                            }

                            break;
                        default:
                            return message.reply("技能代號不存在，無法使用").then(msg => {
                                msg.delete(5000)
                            });
                    }


                }).catch(err => {
                    console.log(err)
                    return message.reply("取消").then(msg => {
                        msg.delete(1000)
                    });
                });
                break;
            case '狀態':
                /*let statusEmbed = new Discord.RichEmbed()
                .setTitle("**__回合戰鬥狀態欄__**")
                .addField(Player_info.CharacterName,
                "**生命： **" + Player_info.Character_HP + " / " + Player_info.Character_MaxHP + "\n" +
                "**魔力： **" + Player_info.Character_MP + " / " + Player_info.Character_MaxMP + "\n" +
                "**行動點數： **" + Player_info.Character_AP + " / " + Player_info.Character_MaxAP + "\n" +
                "**異常狀態1： **" + Player_info.Character_Status1 + "\n" +
                "**異常狀態2： **" + Player_info.Character_Status2 + "\n" +
                "**異常狀態3： **" + Player_info.Character_Status3 + "\n" +
                "**異常狀態4： **" + Player_info.Character_Status4 + "\n" +
                "**異常狀態5： **" + Player_info.Character_Status5 + "\n" +
                "**異常狀態6： **" + Player_info.Character_Status6 + "\n" 
                )
                message.reply(statusEmbed);*/
            case '逃跑':

                break;
        }

    }
}