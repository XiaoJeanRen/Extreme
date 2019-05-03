const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const Player_Skill_Data = require("../players_skills.json");
const PartyData = require("../players_party_data.json");
const isDead_Check = require("../commandly_Use/Player_isDead");
const isMonsterDead = require("../command_Fight/Monster_isDead");
const Weapon_Type_Check = require("../command_Fight/check_Weapon");
const Player_HpMpAp_Check = require("../command_Fight/check_HpMpAp");
const CommandAttack_Check = require("../command_Fight/commonAttack");
const SkillAttack_Check = require("../command_Fight/skillsAttack");
const MonsterAttack_Check = require("../command_Fight/Monster_Attack");
const Party_Taunt = require("../command_Fight/Party_Max_Taunt");
const Warrior_Skill = require("../command_Skills/skillsUse_Warrior"); //戰士技能消耗
//查看角色狀態指令

module.exports = class hunt_fight {
    constructor() {
        this.name = 'huntfight',
            this.alias = ['hf', 'huntFight', '狩獵戰鬥', 'HF'],
            this.usage = '!huntfight'
    }

    async run(bot, message, args) {

        let playerID = message.author.id;
        //console.log(huntID)
        let Player_Info = userData[playerID];
        if (!Player_Info) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });
        if (Player_Info.Character_Hunt != "正在共同狩獵") return message.reply("你尚未開始狩獵.").then(msg => {
            msg.delete(10000)
        });
        if (Player_Info.Character_Party == "無") return message.reply("你尚未擁有組隊.").then(msg => {
            msg.delete(10000)
        });
        if (Player_Info.Character_isAlive != "還活著") return message.reply("你已經死亡，請輸入!revive").then(msg => {
            msg.delete(10000)
        });

        if (!args[1]) return message.reply("指令錯誤，請輸入!hf (普攻/技能/狀態/逃跑)").then(msg => {
            msg.delete(1000)
        });
        let Fight_Type = args[1];

        let Party_Leader = Player_Info.Character_PartyLeader; //玩家隊伍隊長

        let Party_Info = PartyData[Party_Leader]; //玩家隊伍資訊

        let Party_Hunt_Target = Party_Info.Party_Hunt_Target; //狩獵對象

        let Player_Skill_Info = Player_Skill_Data[playerID];
        if (Party_Taunt.Party_Taunt_Check(Player_Info, Party_Info)) { //檢查隊伍仇恨最高者
            console.log("仇恨轉移")
            Party_Info.Monster_Target = playerID;
        }

        console.log("怪物攻擊對象:" + Party_Info.Monster_Target)

        if (isDead_Check.isDead(Player_Info)) { //檢查玩家是否死亡
            return message.reply("角色已死亡.").then(msg => {
                msg.delete(1000)
            });
        }

        if (isMonsterDead.isMonsterDead(Party_Info)) { //檢查魔物是否死亡
            return message.reply("魔物已死亡，請隊長輸入!loot").then(msg => {
                msg.delete(10000)
            });
        }

        let Weapon_Type = Weapon_Type_Check.WeaponCheck(playerID);
        console.log("玩家武器類型：" + Weapon_Type)
        var Player_Total_Damge = 0;
        var Monster_Total_Damage = 0;
        var WarriorExtraDamage = 0;
        switch (Fight_Type) {
            case '普攻':
            case '普通攻擊':

                if (Player_Info.Character_AP < 5) {
                    return message.reply("行動值不足").then(msg => {
                        msg.delete(10000)
                    });
                } else {
                    Player_Info.Character_AP -= 5;
                }

                if (CommandAttack_Check.isMiss(Player_Info, Party_Info)) { //檢查攻擊是否命中
                    console.log("玩家命中")

                    if (Player_Info.Character_Class == "戰士") { //戰士特性額外攻擊力
                        WarriorExtraDamage = Player_Info.Character_Level * 2;
                        console.log("戰士額外=" + WarriorExtraDamage)

                    }
                    if (MonsterAttack_Check.Monster_isCanAttack(Party_Info)) { //檢查怪物是否有攻擊
                        console.log("怪物攻擊回合");
                        Player_Total_Damge = WarriorExtraDamage + CommandAttack_Check.Player_CommonAttack(Player_Info, Party_Info, Weapon_Type);
                        Monster_Total_Damage = MonsterAttack_Check.Monster_Damage(Party_Info);

                        Party_Taunt.Cal_Taunt(Player_Info, Player_Total_Damge); //計算仇恨
                        console.log("怪物總攻擊：" + Monster_Total_Damage);
                        console.log("玩家總攻擊：" + Player_Total_Damge)
                    }
                    message.reply("你的「普通攻擊」命中了.").then(msg => {
                        msg.delete(5000)
                    });
                } else {
                    console.log("玩家未命中")
                    if (MonsterAttack_Check.Monster_isCanAttack(Party_Info)) { //檢查怪物是否有攻擊
                        console.log("怪物攻擊回合");
                        Monster_Total_Damage = MonsterAttack_Check.Monster_Damage(Party_Info);
                        console.log("怪物總攻擊：" + Monster_Total_Damage);
                    }
                    message.reply("你的「普通攻擊」未命中.").then(msg => {
                        msg.delete(5000)
                    });
                }
                Player_HpMpAp_Check.Del_Monster_And_Player_Damage(Party_Info, Player_Total_Damge, Monster_Total_Damage);
                CommandAttack_Check.Player_Attack_Turn_Plus(Party_Info); //玩家回合增加
                break;
            case '技能6004':
            case '劈砍':
                Player_Skill_Info = Player_Skill_Info.技能6004;

                if (Player_Skill_Info.Skill_isLearn == "尚未習得") {
                    return message.reply("技能尚未學習，無法使用").then(msg => {
                        msg.delete(5000)
                    });
                }
                if (Player_HpMpAp_Check.Player_NoHpMpAp(Player_Info, Player_Skill_Info)) {
                    return message.reply("施放技能失敗.").then(msg => {
                        msg.delete(5000)
                    });
                }

                Warrior_Skill.Skill_6004(Player_Info, Player_Skill_Info); //扣除所需的能量

                if (SkillAttack_Check.isSkillMiss(Player_Info, Party_Info, Player_Skill_Info)) {
                    Player_Total_Damge = Math.floor(SkillAttack_Check.SkillAttack(Player_Info, Party_Info, Player_Skill_Info));
                    if (MonsterAttack_Check.Monster_isCanAttack(Party_Info)) { //檢查怪物是否有攻擊
                        console.log("怪物攻擊回合");

                        Monster_Total_Damage = MonsterAttack_Check.Monster_Damage(Party_Info);
                        Party_Taunt.Cal_Taunt(Player_Info, Player_Total_Damge);
                        console.log("怪物總攻擊：" + Monster_Total_Damage);
                    }
                    console.log("技能攻擊命中")
                    message.reply("你的「劈砍」命中了.").then(msg => {
                        msg.delete(5000)
                    });
                } else {
                    if (MonsterAttack_Check.Monster_isCanAttack(Party_Info)) { //檢查怪物是否有攻擊
                        console.log("怪物攻擊回合");

                        Monster_Total_Damage = MonsterAttack_Check.Monster_Damage(Party_Info);
                        Party_Taunt.Cal_Taunt(Player_Info, Player_Total_Damge);
                        console.log("怪物總攻擊：" + Monster_Total_Damage);
                    }
                    console.log("技能攻擊未命中")
                    message.reply("你的「劈砍」未命中.").then(msg => {
                        msg.delete(5000)
                    });
                }
                Player_HpMpAp_Check.Del_Monster_And_Player_Damage(Party_Info, Player_Total_Damge, Monster_Total_Damage);
                CommandAttack_Check.Player_Attack_Turn_Plus(Party_Info); //玩家回合增加
                break;

            case '狀態':
                let monsterEmbed = new Discord.RichEmbed()
                    .addField("魔物狀態",
                        "魔物名稱：" + Party_Hunt_Target + "\n" +
                        "魔物血量：" + Party_Info.Monster_HP + "\n" +
                        "魔物攻擊力：" + Party_Info.Monster_Atk + "\n" +
                        "魔物防禦力：" + Party_Info.Monster_Def + "\n" +
                        "魔物目前目標：" + Party_Info.Monster_Target + "\n"
                    );
                message.reply(monsterEmbed);
                break;
            default:
                message.reply("錯誤");
                break;
        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(PartyData), (err) => {});
    }
}