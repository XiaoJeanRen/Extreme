const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const Player_Party = require("../players_party_data.json");
const MonsterData = require("../all_monster_data.json");
const players_Original_Hunt_data = require("../players_original_fight_data.json");
const all_hunt = require("../all_hunts_id_data.json");

let Players_Original = function(playerID){
    let player_Info = userData[playerID];
    players_Original_Hunt_data[playerID] = {
        Character_Str: player_Info.Character_Str,
        Character_Int: player_Info.Character_Int,
        Character_Dex: player_Info.Character_Dex,
        Character_Acc: player_Info.Character_Acc,
        Character_DMG: player_Info.Character_DMG,
        Character_DEF: player_Info.Character_DEF,
        Character_M_DMG: player_Info.Character_M_DMG,
        Character_M_Def: player_Info.Character_M_Def,
        Character_Strike: player_Info.Character_Strike,
        Character_Accurate: player_Info.Character_Accurate,
        Character_Taunt: player_Info.Character_Taunt,
        Character_HIT_DMG: player_Info.Character_HIT_DMG,
        Character_HIT_DEF: player_Info.Character_HIT_DEF,
        Character_CUT_DMG: player_Info.Character_CUT_DMG,
        Character_CUT_DEF: player_Info.Character_CUT_DEF,
        Character_POKE_DMG: player_Info.Character_POKE_DMG,
        Character_POKE_DEF: player_Info.Character_POKE_DEF,
        Character_COLD_DMG: player_Info.Character_COLD_DMG,
        Character_COLD_DEF: player_Info.Character_COLD_DEF,
        Character_FIRE_DMG: player_Info.Character_FIRE_DMG,
        Character_FIRE_DEF: player_Info.Character_FIRE_DEF,
        Character_WOOD_DMG: player_Info.Character_WOOD_DMG,
        Character_WOOD_DEF: player_Info.Character_WOOD_DEF,
        Character_LIGHT_DMG: player_Info.Character_LIGHT_DMG,
        Character_LIGHT_DEF: player_Info.Character_LIGHT_DEF,
        Character_BRIGHT_DMG: player_Info.Character_BRIGHT_DMG,
        Character_BRIGHT_DEF: player_Info.Character_BRIGHT_DEF,
        Character_DARK_DMG: player_Info.Character_DARK_DMG,
        Character_DARK_DEF: player_Info.Character_DARK_DEF,
        Character_POISON_DMG: player_Info.Character_POISON_DMG,
        Character_POISON_DEF: player_Info.Character_POISON_DEF,
        Character_Status1: "無",
        Character_Status2: "無",
        Character_Status3: "無",
        Character_Status4: "無",
        Character_Status5: "無",
        Character_Status6: "無"
    }
}

module.exports = class create_party {
    constructor() {
        this.name = 'huntTogether',
            this.alias = ['共同狩獵', 'htgt', 'h2'],
            this.usage = '!huntTogether'
    }

    async run(bot, message, args) {
        await message.delete();
        /*if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });*/

        let playerID = message.author.id;
        let Player_Info = userData[playerID];
        let myinv_info = inv[playerID];
        let itemID = args[1];
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        if (!args[1]) return message.reply("指令錯誤，指令格式為!h2 <狩獵目標id>").then(msg => {
            msg.delete(1000)
        });
        if (Player_Info.Character_Party == "無") {
            return message.reply("你沒有建立組隊，無法共同狩獵.").then(msg => {
                msg.delete(1000)
            });
        }
        if (Player_Info.Character_Party != "組隊隊長") {
            return message.reply("你不是隊長，無法開始共同狩獵.").then(msg => {
                msg.delete(1000)
            });
        }
        if (Player_Info.Character_Hunt == "正在共同狩獵") {
            return message.reply("你已經在共同狩獵中了.").then(msg => {
                msg.delete(1000)
            });
        }
        if (itemID != myinv_info.invh_1.itemID &&
            itemID != myinv_info.invh_2.itemID &&
            itemID != myinv_info.invh_3.itemID && 
            !MonsterData[itemID]) {
            console.log(`使用者(ID: ${playerID})使用「狩獵目標」失敗.`)
            console.log()
            return message.reply("沒有此狩獵目標，請再次確認.").then(msg => {
                msg.delete(5000)
            });
        } else {
            if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
                msg.delete(1000)
            });

            if (all_hunt[itemID]){
                Player_Party[playerID].Monster_Actually_Level = all_hunt[itemID].Monster_Actually_Level;
                Player_Party[playerID].Monster_HP = all_hunt[itemID].Monster_HP;
                Player_Party[playerID].Monster_Atk = all_hunt[itemID].Monster_Atk;
                Player_Party[playerID].Monster_Def = all_hunt[itemID].Monster_Def;
                Player_Party[playerID].Monster_Strength = all_hunt[itemID].Monster_Strength;
                Player_Party[playerID].Monster_Week = all_hunt[itemID].Monster_Week;
                Player_Party[playerID].Monster_Attack_Turn = Player_Party[playerID].Party_Member_Number; //魔物攻擊回合 = 玩家數量
            }else if(MonsterData[itemID]){
                Player_Party[playerID].Monster_Actually_Level = MonsterData[itemID].Monster_Actually_Level;
                Player_Party[playerID].Monster_HP = MonsterData[itemID].Monster_HP;
                Player_Party[playerID].Monster_Atk = MonsterData[itemID].Monster_Atk;
                Player_Party[playerID].Monster_Def = MonsterData[itemID].Monster_Def;
                Player_Party[playerID].Monster_Strength = MonsterData[itemID].Monster_Strength;
                Player_Party[playerID].Monster_Week = MonsterData[itemID].Monster_Week;
                Player_Party[playerID].Monster_Attack_Turn = Player_Party[playerID].Party_Member_Number; //魔物攻擊回合 = 玩家數量
            }
            
            Player_Info.Character_Hunt = "正在共同狩獵";
            Player_Party[playerID].Party_Hunt_Target = itemID;
            Player_Party[playerID].Party_isHunt = "正在狩獵";
            
            Players_Original(playerID);
            let Party_LeaderID = Player_Info.Character_PartyLeader;
            var Party_Member_Numbers = Player_Party[playerID].Party_Member_Number;
            
            if (Player_Party[Party_LeaderID].Party_Member1 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member1].Character_Hunt = "正在共同狩獵"
                Players_Original(Player_Party[Party_LeaderID].Party_Member1);
            }
            if (Player_Party[Party_LeaderID].Party_Member2 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member2].Character_Hunt = "正在共同狩獵"
                Players_Original(Player_Party[Party_LeaderID].Party_Member2);
            }
            if (Player_Party[Party_LeaderID].Party_Member3 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member3].Character_Hunt = "正在共同狩獵"
                Players_Original(Player_Party[Party_LeaderID].Party_Member3);
            }
            if (Player_Party[Party_LeaderID].Party_Member4 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member4].Character_Hunt = "正在共同狩獵"
                Players_Original(Player_Party[Party_LeaderID].Party_Member4);
            }
            if (Player_Party[Party_LeaderID].Party_Member5 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member5].Character_Hunt = "正在共同狩獵"
                Players_Original(Player_Party[Party_LeaderID].Party_Member5);
            }
        }



        console.log(`使用者(ID: ${playerID})使用「共同狩獵」`)
        message.reply(`共同狩獵「${itemID}」開始.\n提示：挑戰人數為${Party_Member_Numbers}人，這代表著你每執行${Party_Member_Numbers}次行動，狩獵對象將攻擊你的隊伍.`).then(msg => {
            msg.delete(20000)
        });

        fs.writeFile("./players_original_fight_data.json", JSON.stringify(players_Original_Hunt_data), (err) => {});
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(Player_Party), (err) => {});
    }
}