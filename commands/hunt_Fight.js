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
            this.alias = ['hf', 'huntFight', '狩獵戰鬥', 'HF'],
            this.usage = '!huntfight'
    }

    async run(bot, message, args) {
        /*if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });*/
        let playerID = message.author.id;
        let huntID = hunt_Monster[playerID].Monster_ID;
        //console.log(huntID)
        let Player_info = userData[playerID];
        let Player_Equip_info = character_equip_info[playerID];
        let Player_Skill_info = player_Skill[playerID];
        let Monster_info = hunt_MonsterData[huntID];
        if (hunt_Monster[playerID].isFightMonster === false) return message.reply("你還未參與任何狩獵活動").then(msg => {
            msg.delete(10000)
        });
        if (Player_info.Character_HP <= 0) return message.reply("你似乎已經死亡了...請輸入!revive").then(msg => {
            msg.delete(10000)
        });

        //console.log(Monster_info)
        let fight_Type = args[1];
        if (!args[1]) return message.reply("指令錯誤，請輸入!hf (普攻/技能/狀態/逃跑)").then(msg => {
            msg.delete(1000)
        });

        let player_Hunt_reset = function (playerID) {
            console.log(hunt_Monster[playerID].Monster_Name)
            hunt_Monster[playerID].Monster_Name = "無";
            hunt_Monster[playerID].Monster_ID = "無";
            hunt_Monster[playerID].Monster_Number = 0;
            hunt_Monster[playerID].Monster_Time = 0;
            hunt_Monster[playerID].Monster_Need_Time = 0;
            hunt_Monster[playerID].Fight_place = "無";
            hunt_Monster[playerID].isFightMonster = false;
            hunt_Monster[playerID].FightMonster = "尚未狩獵";
            hunt_Monster[playerID].FightMonster_TotalHP = 0;
            hunt_Monster[playerID].FightMonster_FightHP = 0;
            userData[playerID].Character_Hunt = "無";
        }

        let Random_Damage = function () {
            return Math.floor(Math.random() * 10) + 1;
        }

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
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF);
                    console.log("未觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Weapon_Type == "斬") {
                if (Player_info.Character_CUT_DMG > Monster_info.Mosnter_CUT_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF) * 1.2;
                    console.log("觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF);
                    console.log("未觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Weapon_Type == "打") {
                if (Player_info.Character_HIT_DMG > Monster_info.Mosnter_HIT_DEF) {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF) * 1.2;
                    console.log("觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (Player_info.Character_DMG - Monster_info.Mosnter_DEF);
                    console.log("未觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else {
                let Player_Total_DMG = 1;
                console.log("未觸發任何屬性弱點攻擊，總傷害: " + Player_Total_DMG);
                return Player_Total_DMG
            }
        }

        let check_Skill_Extra_Damage = function (Player_Skill_info) {
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

        let Monster_last_HP = function () {
            let Monster_TotalHP = hunt_Monster[playerID].FightMonster_TotalHP;
            let Monster_LastHP = hunt_Monster[playerID].FightMonster_FightHP;
            let Monster_MiddleHP = Math.floor(Monster_LastHP / 2);
            //console.log("最大: " + Monster_TotalHP)
            //console.log("一半: " + Monster_MiddleHP)

            if (Monster_LastHP <= 0 || Monster_MiddleHP == 0) {
                return "魔物們似乎已經倒下了..."
            } else if (Monster_LastHP <= Monster_MiddleHP && Monster_LastHP > 0) {
                return "魔物們似乎已經瀕死..."
            } else if (Monster_LastHP > Monster_MiddleHP && Monster_LastHP < Monster_TotalHP) {
                return "魔物們似乎還很亢奮..."
            } else {
                return "錯誤"
            }
        }

        let SkillAttack = function (Player_Skill_info) {
            let Skill_Extra_Damage = check_Skill_Extra_Damage(Player_Skill_info);
            let Skill_Type = Player_Skill_info.Skill_Type;
            let Monster_Total_DEF = (Monster_info.Mosnter_DEF + Monster_info.Mosnter_M_DEF);
            let Skill_Attack_Damage = 1;
            if (Player_Skill_info.Skill_Attack_Type == "物理") {
                Skill_Attack_Damage = Player_info.Character_DMG;
            } else if (Player_Skill_info.Skill_Attack_Type == "魔法") {
                Skill_Attack_Damage = Player_info.Character_M_DMG;
            } else {
                Skill_Attack_Damage = 1;
            }
            console.log(Skill_Attack_Damage);
            console.log("使用技能屬性為: " + Skill_Type);
            if (Skill_Type == "火") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_FIRE_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_FIRE_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發火屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發火屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "水") {
                console.log(Player_Skill_info.Skill_Add_COLD_DMG)
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_COLD_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_COLD_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發水屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發水屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "木") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_WOOD_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_WOOD_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發木屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發木屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "雷") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_LIGHT_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_LIGHT_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發雷屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發雷屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "光") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_BRIGHT_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_BRIGHT_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發光屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發光屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "暗") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_DARK_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_DARK_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發暗屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸發暗屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "毒") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_POISON_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_POISON_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發毒屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸毒屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "打") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_HIT_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_HIT_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸打屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "斬") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_CUT_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_CUT_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸斬屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                }
            } else if (Skill_Type == "刺") {
                let player_Skill_Total_Damage = Skill_Attack_Damage * (Player_Skill_info.Skill_Add_POKE_DMG / 100) + Skill_Extra_Damage;
                if (player_Skill_Total_Damage > Monster_info.Mosnter_POKE_DEF) {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF) * 1.5;
                    console.log("觸發刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
                } else {
                    let Player_Total_DMG = (player_Skill_Total_Damage - Monster_Total_DEF);
                    console.log("未觸刺屬弱點攻擊，總傷害: " + Player_Total_DMG);
                    return Player_Total_DMG + Random_Damage()
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

        let Monster_Level_Difference_Check = function () {
            let Monster_AND_Player_Level_Difference = Monster_info.Monster_Level - Player_info.Character_Level;

            console.log("怪物與玩家等差: " + Monster_AND_Player_Level_Difference)
            if (Monster_AND_Player_Level_Difference >= 10) {
                console.log("魔物基礎傷害10*等差")
                return 10 * Monster_AND_Player_Level_Difference;
            } else if (Monster_AND_Player_Level_Difference >= 5 && Monster_AND_Player_Level_Difference < 10) {
                console.log("魔物基礎傷害5*等差")
                return 5 * Monster_AND_Player_Level_Difference;
            } else {
                console.log("魔物基礎傷害20")
                return 20;
            }
        }

        let Monster_Attribute = function () {
            let Monster_AttributeType = Monster_info.Monster_Attributes;
            console.log("魔物屬性= " + Monster_AttributeType);
            let baseAttack = (Monster_info.Mosnter_DMG + Monster_info.Mosnter_M_DMG) - (Player_info.Character_DEF + Player_info.Character_M_Def);
            if (baseAttack <= 0) {
                baseAttack = 1;
            }
            if (Monster_AttributeType == "火") {
                if (Monster_info.Mosnter_FIRE_DMG > Player_info.Character_FIRE_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_FIRE_DMG - Player_info.Character_FIRE_DEF);
                    console.log("魔物造成火屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "水") {
                if (Monster_info.Mosnter_COLD_DMG > Player_info.Character_COLD_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_COLD_DMG - Player_info.Character_COLD_DEF);
                    console.log("魔物造成水屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "木") {
                if (Monster_info.Mosnter_WOOD_DMG > Player_info.Character_WOOD_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_WOOD_DMG - Player_info.Character_WOOD_DEF);
                    console.log("魔物造成木屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "雷") {
                if (Monster_info.Mosnter_LIGHT_DMG > Player_info.Character_LIGHT_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_LIGHT_DMG - Player_info.Character_LIGHT_DEF);
                    console.log("魔物造成雷屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "光") {
                if (Monster_info.Mosnter_BRIGHT_DMG > Player_info.Character_BRIGHT_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_BRIGHT_DMG - Player_info.Character_BRIGHT_DEF);
                    console.log("魔物造成光屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "暗") {
                if (Monster_info.Mosnter_DARK_DMG > Player_info.Character_DARK_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_DARK_DMG - Player_info.Character_DARK_DEF);
                    console.log("魔物造成暗屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "毒") {
                if (Monster_info.Mosnter_POISON_DMG > Player_info.Character_POISON_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_POISON_DMG - Player_info.Character_POISON_DEF);
                    console.log("魔物造成毒屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "打") {
                if (Monster_info.Mosnter_HIT_DMG > Player_info.Character_HIT_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_HIT_DMG - Player_info.Character_HIT_DEF);
                    console.log("魔物造成打屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "斬") {
                if (Monster_info.Mosnter_CUT_DMG > Player_info.Character_CUT_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_CUT_DMG - Player_info.Character_CUT_DEF);
                    console.log("魔物造成斬屬性傷害")
                    return Attrubute_Attack;
                }
            } else if (Monster_AttributeType == "刺") {
                if (Monster_info.Mosnter_POKE_DMG > Player_info.Character_POKE_DEF) {
                    let Attrubute_Attack = baseAttack + (Monster_info.Mosnter_POKE_DMG - Player_info.Character_POKE_DEF);
                    console.log("魔物造成刺屬性傷害")
                    return Attrubute_Attack;
                }
            } else {
                console.log("魔物造成無屬性傷害")
                return 20;
            }
        }

        let Monster_Damage = function () {
            let Monster_Base_Damage = Monster_Level_Difference_Check() + Random_Damage();
            let Monster_Attribute_Damage = Monster_Attribute();
            let Monster_Total_Damage = Monster_Base_Damage + Monster_Attribute_Damage;

            return Monster_Total_Damage;
        }

        let is_Player_NoHPMPAP = function (Player_Skill_info) {
            if (Player_Skill_info.Skill_Decrease_Hp > Player_info.Character_HP ||
                Player_Skill_info.Skill_Decrease_Mp > Player_info.Character_MP ||
                Player_Skill_info.Skill_Decrease_Ap > Player_info.Character_AP
            ) {
                return true;
            }
        }

        let Player_Skill_Decrease_And_Increase = function (Player_Skill_info) {

            Player_info.Character_HP -= Player_Skill_info.Skill_Decrease_Hp;
            Player_info.Character_MP -= Player_Skill_info.Skill_Decrease_Mp;
            Player_info.Character_AP -= Player_Skill_info.Skill_Decrease_Ap;
            Player_info.Character_HP += Player_Skill_info.Skill_Increase_Hp;
            Player_info.Character_MP += Player_Skill_info.Skill_Increase_Mp;
            Player_info.Character_AP += Player_Skill_info.Skill_Increase_Ap;
            Player_info.Character_POKE_DEF += Player_Skill_info.Skill_Add_POKE_DEF;
            Player_info.Character_CUT_DEF += Player_Skill_info.Skill_Add_CUT_DEF;
            Player_info.Character_HIT_DEF += Player_Skill_info.Skill_Add_HIT_DEF;
        }

        let isPlayer_Dead = function () {
            if (Player_info.Character_HP <= 0) {
                return true;
            }
        }

        if (isPlayer_Dead()) {
            player_Hunt_reset(playerID);
            return message.reply(`角色死亡`).then(msg => {
                msg.delete(10000)
            });
        }

        switch (fight_Type) {
            case '普通攻擊':
            case '普攻':
                if (Player_info.Character_AP < 5) {
                    return message.reply(`發動失敗`).then(msg => {
                        msg.delete(1000)
                    });
                }
                if (isMiss()) {
                    if(Player_info.Character_Class == "戰士"){
                        let warriorExtraDamage = Player_info.Level * 2;
                    }else{
                        warriorExtraDamage = 0;
                    }
                    let Damage = Math.floor(CommonAttack()) + warriorExtraDamage;
                    let MonsterDamage = Math.floor(Monster_Damage());
                    hunt_Monster[playerID].FightMonster_FightHP -= Damage;
                    Player_info.Character_HP -= MonsterDamage;
                    Player_info.Character_AP -= 5;
                    message.reply("普通攻擊命中，" + Monster_last_HP() + "，魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("普通攻擊命中")

                } else {
                    let MonsterDamage = Monster_Damage()
                    Player_info.Character_HP -= MonsterDamage;
                    message.reply("普通攻擊未命中，魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("普通攻擊未命中")
                }

                break;
            case '技能1001':
                Player_Skill_info = Player_Skill_info.技能1001;
                if (Player_Skill_info.Skill_isLearn == "尚未習得") {
                    return message.reply("技能尚未學習，無法使用").then(msg => {
                        msg.delete(5000)
                    });
                }

                if (is_Player_NoHPMPAP(Player_Skill_info)) {
                    return message.reply("發動失敗");
                }

                if (isSkillMiss(Player_Skill_info.Skill_Add_Accurate)) {
                    let Damage = Math.floor(SkillAttack(Player_Skill_info));
                    let MonsterDamage = Math.floor(Monster_Damage());

                    hunt_Monster[playerID].FightMonster_FightHP -= Damage;

                    Player_Skill_Decrease_And_Increase(Player_Skill_info);
                    message.reply("技能1001攻擊命中，" + Monster_last_HP() +
                        "\n魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊命中")

                } else {
                    let MonsterDamage = Monster_Damage()
                    Player_info.Character_HP -= MonsterDamage;
                    message.reply("技能1001攻擊未命中，魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊未命中")
                }
                break;
            case '近戰精通':
            case '技能6001':
                return message.reply("使用失敗，此為被動技能").then(msg => {
                    msg.delete(20000)
                });
            case '耐力訓練':
            case '技能6002':
                return message.reply("使用失敗，此為被動技能").then(msg => {
                    msg.delete(20000)
                });
            case '勇氣':
            case '技能6003':
                Player_Skill_info = Player_Skill_info.技能6003;
                if (Player_Skill_info.Skill_isLearn == "尚未習得") {
                    return message.reply("技能尚未學習，無法使用").then(msg => {
                        msg.delete(5000)
                    });
                }

                if (is_Player_NoHPMPAP(Player_Skill_info)) {
                    return message.reply("發動失敗");
                }
                let MonsterDamage = Math.floor(Monster_Damage());
                Player_info.Character_HP -= MonsterDamage;
                Player_Skill_Decrease_And_Increase(Player_Skill_info);
                message.reply("「勇氣」發動成功，" + Monster_last_HP() +
                    "\n魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                console.log("技能攻擊命中")
                break;
            case '劈砍':
            case '技能6004':
                Player_Skill_info = Player_Skill_info.技能6004;
                if (Player_Skill_info.Skill_isLearn == "尚未習得") {
                    return message.reply("技能尚未學習，無法使用").then(msg => {
                        msg.delete(5000)
                    });
                }

                if (is_Player_NoHPMPAP(Player_Skill_info)) {
                    return message.reply("發動失敗");
                }

                if (isSkillMiss(Player_Skill_info.Skill_Add_Accurate)) {
                    let Damage = Math.floor(SkillAttack(Player_Skill_info));
                    let MonsterDamage = Math.floor(Monster_Damage());

                    hunt_Monster[playerID].FightMonster_FightHP -= Damage;

                    Player_Skill_Decrease_And_Increase(Player_Skill_info);
                    message.reply("「劈砍」攻擊命中，" + Monster_last_HP() +
                        "\n魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊命中")

                } else {
                    let MonsterDamage = Math.floor(Monster_Damage());
                    Player_info.Character_HP -= MonsterDamage;
                    message.reply("「劈砍」攻擊未命中，魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊未命中")
                }
                break;
            case '突刺':
            case '技能6005':
                Player_Skill_info = Player_Skill_info.技能6005;
                if (Player_Skill_info.Skill_isLearn == "尚未習得") {
                    return message.reply("技能尚未學習，無法使用").then(msg => {
                        msg.delete(5000)
                    });
                }

                if (is_Player_NoHPMPAP(Player_Skill_info)) {
                    return message.reply("發動失敗");
                }

                if (isSkillMiss(Player_Skill_info.Skill_Add_Accurate)) {
                    let Damage = Math.floor(SkillAttack(Player_Skill_info));
                    let MonsterDamage = Math.floor(Monster_Damage());

                    hunt_Monster[playerID].FightMonster_FightHP -= Damage;

                    Player_Skill_Decrease_And_Increase(Player_Skill_info);
                    message.reply("「突刺」攻擊命中，" + Monster_last_HP() +
                        "\n魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊命中")

                } else {
                    let MonsterDamage = Math.floor(Monster_Damage());
                    Player_info.Character_HP -= MonsterDamage;
                    message.reply("「突刺」攻擊未命中，魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊未命中")
                }
                break;
            case '敲打':
            case '技能6006':
                Player_Skill_info = Player_Skill_info.技能6006;
                if (Player_Skill_info.Skill_isLearn == "尚未習得") {
                    return message.reply("技能尚未學習，無法使用").then(msg => {
                        msg.delete(5000)
                    });
                }

                if (is_Player_NoHPMPAP(Player_Skill_info)) {
                    return message.reply("發動失敗");
                }

                if (isSkillMiss(Player_Skill_info.Skill_Add_Accurate)) {
                    let Damage = Math.floor(SkillAttack(Player_Skill_info));
                    let MonsterDamage = Math.floor(Monster_Damage());

                    hunt_Monster[playerID].FightMonster_FightHP -= Damage;

                    Player_Skill_Decrease_And_Increase(Player_Skill_info);
                    message.reply("「敲打」攻擊命中，" + Monster_last_HP() +
                        "\n魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊命中")

                } else {
                    let MonsterDamage = Math.floor(Monster_Damage());
                    Player_info.Character_HP -= MonsterDamage;
                    message.reply("「敲打」攻擊未命中，魔物們的攻擊對你造成" + MonsterDamage + "傷害");
                    console.log("技能攻擊未命中")
                }
                break;
            case '逃跑':

                break;
            default:
                return message.reply("指令錯誤").then(msg => {
                    msg.delete(20000)
                });
        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_hunt_monster.json", JSON.stringify(hunt_Monster), (err) => {});
    }
}