const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const all_Skills_Data = require("../all_skills_data.json");
const player_learn_Skill = require("../players_skills.json");
//角色升級指令

module.exports = class learn_skill {
    constructor() {
        this.name = 'learnS',
            this.alias = ['學習技能', 'le'],
            this.usage = '!learnS'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let PlayerInfo = userData[playerID];
        console.log(`使用者(ID: ${playerID})使用「技能學習」`)
        if (!PlayerInfo) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });
        if (PlayerInfo.Character_Class == "初心者") return message.reply("你尚未擁有主職業").then(msg => {
            msg.delete(10000)
        });
        let learnSkillID = args[1];
        if (!args[1]) return message.reply("指令錯誤，指令格式為 !learnS 技能代號").then(msg => {
            msg.delete(10000)
        });

        let player_skills = player_learn_Skill[playerID];
        let all_Skills = all_Skills_Data[learnSkillID];
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
            } else {
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
            } else {
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
            } else {
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
            } else {
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
            } else {
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
            } else {
                console.log("玩家弓手，技能牧師")
                return Skill_Exp * 5;
            }

        }
        let isAlreadyLearn = function (player_skills) {
            if (player_skills.Skill_isLearn == "已習得") {
                return true
            } else {
                return false
            }
        }


        switch (learnSkillID) {
            case 'skill_1001':
                player_skills.skill_1001 = all_Skills
                break;
            case 'skill_1002':
                player_skills.skill_1002 = all_Skills
                break;
            case 'skill_1003':
                player_skills.skill_1003 = all_Skills
                break;
            case 'skill_1004':
                player_skills.skill_1004 = all_Skills
                break;
            case 'skill_1005':
                player_skills.skill_1005 = all_Skills
                break;
            case 'skill_1006':
                player_skills.skill_1006 = all_Skills
                break;
            case 'skill_2001':
                player_skills.skill_2001 = all_Skills
                break;
            case 'skill_2002':
                player_skills.skill_2002 = all_Skills
                break;
            case 'skill_2003':
                player_skills.skill_2003 = all_Skills
                break;
            case 'skill_2004':
                player_skills.skill_2004 = all_Skills
                break;
            case 'skill_2005':
                player_skills.skill_2005 = all_Skills
                break;
            case 'skill_2006':
                player_skills.skill_2006 = all_Skills
                break;
            case 'skill_3001':
                player_skills.skill_3001 = all_Skills
                break;
            case 'skill_3002':
                player_skills.skill_3002 = all_Skills
                break;
            case 'skill_3003':
                player_skills.skill_3003 = all_Skills
                break;
            case 'skill_3004':
                player_skills.skill_3004 = all_Skills
                break;
            case 'skill_3005':
                player_skills.skill_3005 = all_Skills
                break;
            case 'skill_3006':
                player_skills.skill_3006 = all_Skills
                break;
            case 'skill_4001':
                player_skills.skill_4001 = all_Skills
                break;
            case 'skill_4002':
                player_skills.skill_4002 = all_Skills
                break;
            case 'skill_4003':
                player_skills.skill_4003 = all_Skills
                break;
            case 'skill_4004':
                player_skills.skill_4004 = all_Skills
                break;
            case 'skill_4005':
                player_skills.skill_4005 = all_Skills
                break;
            case 'skill_4006':
                player_skills.skill_4006 = all_Skills
                break;
            case '盾牌精通':
            case '技能5001':
                player_skills = player_skills.技能5001;
                var need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「盾牌精通」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_DEF = 2;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                player_skills.Character_DEF += 2;


                message.reply("你學會了「盾牌精通」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '防禦精通':
            case '技能5002':
                player_skills = player_skills.技能5002;
                var need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「防禦精通」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Extra_DEF = 1;
                player_skills.Skill_Extra_M_DEF = 1;
                player_skills.Skill_Extra_FIRE_DEF = 1;
                player_skills.Skill_Extra_COLD_DEF = 1;
                player_skills.Skill_Extra_WOOD_DEF = 1;
                player_skills.Skill_Extra_LIGHT_DEF = 1;
                player_skills.Skill_Extra_BRIGHT_DEF = 1;
                player_skills.Skill_Extra_DARK_DEF = 1;
                player_skills.Skill_Extra_HIT_DEF = 1;
                player_skills.Skill_Extra_CUT_DEF = 1;
                player_skills.Skill_Extra_POKE_DEF = 1;
                player_skills.Skill_Extra_POISON_DEF = 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_DEF += 1;
                PlayerInfo.Character_M_Def += 1;
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

                message.reply("你學會了「防禦精通」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '防禦姿態':
            case '技能5003':
                player_skills = player_skills.技能5002;
                var need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「防禦姿態」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Extra_DEF = 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_DEF += 1;


                message.reply("你學會了「防禦姿態」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '盾牌衝擊':
            case '技能5004':
                player_skills = player_skills.技能5004;
                var need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「盾牌衝擊」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_HIT_DMG = 120;
                player_skills.Skill_Extra_HIT_DMG = 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_HIT_DMG += 1;



                message.reply("你學會了「盾牌衝擊」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '挑釁':
            case '技能5005':
                player_skills = player_skills.技能5005;
                var need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「挑釁」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_Taunt = 20;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;


                message.reply("你學會了「挑釁」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '鼓舞':
            case '技能5006':
                return message.reply("尚未設計").then(msg => {
                    msg.delete(10000)
                });
                
            case '近戰精通':
            case '技能6001':
                player_skills = player_skills.技能6001;
                var need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「近戰精通」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Extra_DMG = 1;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_DMG += 1;

                message.reply("你學會了「近戰精通」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '耐力訓練':
            case '技能6002':
                player_skills = player_skills.技能6002;
                need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「耐力訓練」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Extra_HP = 5;
                player_skills.Skill_Need_Exp *= 2;

                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_MaxHP += 5;

                message.reply("你學會了「耐力訓練」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '勇氣':
            case '技能6003':
                player_skills = player_skills.技能6003;
                need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「勇氣」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_POKE_DEF = 1;
                player_skills.Skill_Add_CUT_DEF = 1;
                player_skills.Skill_Add_HIT_DEF = 1;
                player_skills.Skill_Need_Exp *= 2;


                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;


                message.reply("你學會了「勇氣」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '劈砍':
            case '技能6004':
                player_skills = player_skills.技能6004;
                need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「劈砍」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_CUT_DMG = 110;
                player_skills.Skill_Extra_CUT_DMG = 1;
                player_skills.Skill_Need_Exp *= 2;


                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_CUT_DMG += 1;


                message.reply("你學會了「劈砍」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '突刺':
            case '技能6005':
                player_skills = player_skills.技能6005;
                need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「突刺」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_POKE_DMG = 110;
                player_skills.Skill_Extra_POKE_DMG = 1;
                player_skills.Skill_Need_Exp *= 2;


                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_POKE_DMG += 1;


                message.reply("你學會了「突刺」.").then(msg => {
                    msg.delete(10000)
                });
                break;
            case '敲打':
            case '技能6006':
                player_skills = player_skills.技能6006;
                need_Exp = player_Need_Exp(player_skills)
                if (isAlreadyLearn(player_skills)) {
                    return message.reply("你已經會「敲打」了，若你要升級技能，請輸入!升級技能.").then(msg => {
                        msg.delete(10000)
                    });
                }
                if (need_Exp > PlayerInfo.Character_Exp) {
                    return message.reply(`你的經驗不足，至少需要${need_Exp}經驗.`).then(msg => {
                        msg.delete(10000)
                    });
                }
                //玩家技能
                player_skills.Skill_isLearn = "已習得";
                player_skills.Skill_Level = 1;
                player_skills.Skill_Add_HIT_DMG = 110;
                player_skills.Skill_Extra_HIT_DMG = 1;
                player_skills.Skill_Need_Exp *= 2;


                //玩家素質
                PlayerInfo.Character_Exp -= need_Exp;
                PlayerInfo.Character_HIT_DMG += 1;


                message.reply("你學會了「敲打」.").then(msg => {
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