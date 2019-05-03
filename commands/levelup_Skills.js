const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const all_Skills_Data = require("../all_skills_data.json");
const player_learn_Skill = require("../players_skills.json");
//角色升級指令

module.exports = class levelup_skill {
    constructor() {
        this.name = 'slvl',
            this.alias = ['升級技能', '技能升級', 'lvs'],
            this.usage = '!slvl'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let PlayerInfo = userData[playerID];
        console.log(`使用者(ID: ${playerID})使用「技能升級」`)
        if (!PlayerInfo) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });
        if (PlayerInfo.Character_Class == "初心者") return message.reply("你尚未擁有主職業").then(msg => {
            msg.delete(10000)
        });
        let levelupSkillID = args[1];
        if (!args[1]) return message.reply("指令錯誤，指令格式為 !lvs 技能代號").then(msg => {
            msg.delete(10000)
        });

        let player_skills = player_learn_Skill[playerID];
        let all_Skills = all_Skills_Data[levelupSkillID];
        let player_Need_Exp = function (player_skills) {
            let Player_Class = PlayerInfo.Character_Class;
            let Skill_Class = player_skills.Skill_Class;
            let Skill_Exp = player_skills.Skill_Need_Exp;
            if (Player_Class == "戰士" && Skill_Class == "戰士") {
                console.log("同戰士系")
                return Skill_Exp;
            } else if (Player_Class == "戰士" && (Skill_Class == "弓手" || Skill_Class == "騎士")) {
                console.log("玩家戰士，技能弓手或騎士")
                return Skill_Exp * 2;
            } else if (Player_Class == "戰士" && (Skill_Class == "小偷" || Skill_Class == "牧師")) {
                console.log("玩家戰士，技能小偷或牧師")
                return Skill_Exp * 3;
            } else if (Player_Class == "戰士" && Skill_Class == "法師") {
                console.log("玩家戰士，技能法師")
                return Skill_Exp * 5;
            }

            if (Player_Class == "騎士" && Skill_Class == "騎士") {
                console.log("同騎士系")
                return Skill_Exp;
            } else if (Player_Class == "騎士" && (Skill_Class == "戰士" || Skill_Class == "牧師")) {
                console.log("玩家騎士，技能戰士或牧師")
                return Skill_Exp * 2;
            } else if (Player_Class == "騎士" && (Skill_Class == "弓手" || Skill_Class == "法師")) {
                console.log("玩家騎士，技能弓手或法師")
                return Skill_Exp * 3;
            } else if (Player_Class == "騎士" && Skill_Class == "小偷") {
                console.log("玩家騎士，技能小偷")
                return Skill_Exp * 5;
            }

            if (Player_Class == "牧師" && Skill_Class == "牧師") {
                console.log("同牧師系")
                return Skill_Exp;
            } else if (Player_Class == "牧師" && (Skill_Class == "騎士" || Skill_Class == "法師")) {
                console.log("玩家牧師，技能法師或騎士")
                return Skill_Exp * 2;
            } else if (Player_Class == "牧師" && (Skill_Class == "戰士" || Skill_Class == "小偷")) {
                console.log("玩家牧師，技能小偷或戰士")
                return Skill_Exp * 3;
            } else if (Player_Class == "牧師" && Skill_Class == "弓手") {
                console.log("玩家牧師，技能弓手")
                return Skill_Exp * 5;
            }

            if (Player_Class == "法師" && Skill_Class == "法師") {
                console.log("同法師系")
                return Skill_Exp;
            } else if (Player_Class == "法師" && (Skill_Class == "牧師" || Skill_Class == "小偷")) {
                console.log("玩家法師，技能牧師或小偷")
                return Skill_Exp * 2;
            } else if (Player_Class == "法師" && (Skill_Class == "弓手" || Skill_Class == "騎士")) {
                console.log("玩家法師，技能弓手或騎士")
                return Skill_Exp * 3;
            } else if (Player_Class == "法師" && Skill_Class == "戰士") {
                console.log("玩家法師，技能戰士")
                return Skill_Exp * 5;
            }

            if (Player_Class == "小偷" && Skill_Class == "小偷") {
                console.log("同小偷系")
                return Skill_Exp;
            } else if (Player_Class == "小偷" && (Skill_Class == "法師" || Skill_Class == "弓手")) {
                console.log("玩家小偷，技能弓手或法師")
                return Skill_Exp * 2;
            } else if (Player_Class == "小偷" && (Skill_Class == "戰士" || Skill_Class == "牧師")) {
                console.log("玩家小偷，技能戰士或牧師")
                return Skill_Exp * 3;
            } else if (Player_Class == "小偷" && Skill_Class == "騎士") {
                console.log("玩家小偷，技能騎士")
                return Skill_Exp * 5;
            }

            if (Player_Class == "弓手" && Skill_Class == "弓手") {
                console.log("同弓手系")
                return Skill_Exp;
            } else if (Player_Class == "弓手" && (Skill_Class == "戰士" || Skill_Class == "小偷")) {
                console.log("玩家弓手，技能戰士或小偷")
                return Skill_Exp * 2;
            } else if (Player_Class == "弓手" && (Skill_Class == "騎士" || Skill_Class == "法師")) {
                console.log("玩家弓手，技能騎士或法師")
                return Skill_Exp * 3;
            } else if (Player_Class == "弓手" && Skill_Class == "牧師") {
                console.log("玩家弓手，技能牧師")
                return Skill_Exp * 5;
            }

        }

        let isSkillLevelMax = function (player_skills) {
            let Max_Level = player_skills.Skill_MaxLevel;
            if (player_skills.Skill_Level == Max_Level) {
                return true;
            }
        }

        switch (levelupSkillID) {
            case '防禦精通':
            case '技能5002':
                player_skills = player_skills.技能5002;
                var need_Exp = player_Need_Exp(player_skills)
                if (player_skills.Skill_isLearn == "尚未習得") {
                    return message.reply(`你尚未習得此技能.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (isSkillLevelMax(player_skills)) {
                    return message.reply(`此技能已達最高等級.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_Level += 1;
                player_skills.Skill_Extra_DEF += 1;
                player_skills.Skill_Extra_FIRE_DEF += 1;
                player_skills.Skill_Extra_COLD_DEF += 1;
                player_skills.Skill_Extra_WOOD_DEF += 1;
                player_skills.Skill_Extra_LIGHT_DEF += 1;
                player_skills.Skill_Extra_BRIGHT_DEF += 1;
                player_skills.Skill_Extra_DARK_DEF += 1;
                player_skills.Skill_Extra_HIT_DEF += 1;
                player_skills.Skill_Extra_CUT_DEF += 1;
                player_skills.Skill_Extra_POKE_DEF += 1;
                player_skills.Skill_Extra_POISON_DEF += 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_DEF += 1;
                PlayerInfo.Character_HIT_DEF += 1;
                PlayerInfo.Character_CUT_DEF += 1;
                PlayerInfo.Character_POKE_DEF += 1;
                PlayerInfo.Character_COLD_DEF += 1;
                PlayerInfo.Character_FIRE_DEF += 1;
                PlayerInfo.Character_WOOD_DEF += 1;
                PlayerInfo.Character_LIGHT_DEF += 1;
                PlayerInfo.Character_BRIGHT_DEF += 1;
                PlayerInfo.Character_DARK_DEF += 1;
                PlayerInfo.Character_POISON_DEF += 1;


                message.reply("你升級了「防禦精通」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '盾牌衝擊':
            case '技能5004':
                player_skills = player_skills.技能5004;
                var need_Exp = player_Need_Exp(player_skills)
                if (player_skills.Skill_isLearn == "尚未習得") {
                    return message.reply(`你尚未習得此技能.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (isSkillLevelMax(player_skills)) {
                    return message.reply(`此技能已達最高等級.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_Level += 1;
                player_skills.Skill_Add_HIT_DMG += 2;
                player_skills.Skill_Extra_HIT_DMG += 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_HIT_DMG += 1;

                message.reply("你升級了「盾牌衝擊」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '挑釁':
            case '技能5005':
                player_skills = player_skills.技能5005;
                var need_Exp = player_Need_Exp(player_skills)
                if (player_skills.Skill_isLearn == "尚未習得") {
                    return message.reply(`你尚未習得此技能.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (isSkillLevelMax(player_skills)) {
                    return message.reply(`此技能已達最高等級.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_Level += 1;
                player_skills.Skill_Add_Taunt += 2;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;

                message.reply("你升級了「挑釁」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '近戰精通':
            case '技能6001':
                player_skills = player_skills.技能6001;
                var need_Exp = player_Need_Exp(player_skills)
                if (player_skills.Skill_isLearn == "尚未習得") {
                    return message.reply(`你尚未習得此技能.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (isSkillLevelMax(player_skills)) {
                    return message.reply(`此技能已達最高等級.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_Level += 1;
                player_skills.Skill_Extra_DMG = 1;
                player_skills.Skill_Extra_Str = 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_DMG += 1; //增加人物物理攻擊力
                PlayerInfo.Character_Str += 1; //增加人物力量

                message.reply("你升級了「近戰精通」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '耐力訓練':
            case '技能6002':
                player_skills = player_skills.技能6002;
                if (player_skills.Skill_isLearn == "尚未習得") {
                    return message.reply(`你尚未習得此技能.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                need_Exp = player_Need_Exp(player_skills)
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (isSkillLevelMax(player_skills)) {
                    return message.reply(`此技能已達最高等級.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_Level += 1;
                player_skills.Skill_Extra_HP = 5;
                player_skills.Skill_Extra_AP = 5;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_MaxHP += 5;
                PlayerInfo.Character_MaxAP += 5;

                message.reply("你升級了「耐力訓練」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '劈砍':
            case '技能6004':
                player_skills = player_skills.技能6004;
                if (player_skills.Skill_isLearn == "尚未習得") {
                    return message.reply(`你尚未習得此技能.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                need_Exp = player_Need_Exp(player_skills)
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                if (isSkillLevelMax(player_skills)) {
                    return message.reply(`此技能已達最高等級.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level += 1;
                player_skills.Skill_Add_CUT_DMG += 2;
                player_skills.Skill_Extra_CUT_DMG += 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_CUT_DMG += 1;


                message.reply("你升級了「劈砍」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            default:
                return message.reply("技能代號錯誤").then(msg => {
                    msg.delete(10000)
                });
        }



        fs.writeFile("./players_skills.json", JSON.stringify(player_learn_Skill), (err) => {});
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
    }
}