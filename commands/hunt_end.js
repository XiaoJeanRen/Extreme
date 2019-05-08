const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const Player_Party = require("../players_party_data.json");
const player_Original_Hunt_data = require("../players_original_fight_data.json");

let player_Hunt_reset = function (playerID) {
    
    userData[playerID].Character_Hunt = "無";
    userData[playerID].Character_Str = player_Original_Hunt_data[playerID].Character_Str;
    userData[playerID].Character_Int = player_Original_Hunt_data[playerID].Character_Int;
    userData[playerID].Character_Dex = player_Original_Hunt_data[playerID].Character_Dex;
    userData[playerID].Character_Acc = player_Original_Hunt_data[playerID].Character_Acc;
    userData[playerID].Character_DMG = player_Original_Hunt_data[playerID].Character_DMG;
    userData[playerID].Character_DEF = player_Original_Hunt_data[playerID].Character_DEF;
    userData[playerID].Character_M_DMG = player_Original_Hunt_data[playerID].Character_M_DMG;
    userData[playerID].Character_Strike = player_Original_Hunt_data[playerID].Character_Strike;
    userData[playerID].Character_Accurate = player_Original_Hunt_data[playerID].Character_Accurate;
    userData[playerID].Character_Taunt = player_Original_Hunt_data[playerID].Character_Taunt;
    userData[playerID].Character_HIT_DMG = player_Original_Hunt_data[playerID].Character_HIT_DMG;
    userData[playerID].Character_HIT_DEF = player_Original_Hunt_data[playerID].Character_HIT_DEF;
    userData[playerID].Character_CUT_DMG = player_Original_Hunt_data[playerID].Character_CUT_DMG;
    userData[playerID].Character_CUT_DEF = player_Original_Hunt_data[playerID].Character_CUT_DEF;
    userData[playerID].Character_POKE_DMG = player_Original_Hunt_data[playerID].Character_POKE_DMG;
    userData[playerID].Character_POKE_DEF = player_Original_Hunt_data[playerID].Character_POKE_DEF;
    userData[playerID].Character_COLD_DMG = player_Original_Hunt_data[playerID].Character_COLD_DMG;
    userData[playerID].Character_COLD_DEF = player_Original_Hunt_data[playerID].Character_COLD_DEF;
    userData[playerID].Character_FIRE_DMG = player_Original_Hunt_data[playerID].Character_FIRE_DMG;
    userData[playerID].Character_FIRE_DEF = player_Original_Hunt_data[playerID].Character_FIRE_DEF;
    userData[playerID].Character_WOOD_DMG = player_Original_Hunt_data[playerID].Character_WOOD_DMG;
    userData[playerID].Character_WOOD_DEF = player_Original_Hunt_data[playerID].Character_WOOD_DEF;
    userData[playerID].Character_LIGHT_DMG = player_Original_Hunt_data[playerID].Character_LIGHT_DMG;
    userData[playerID].Character_LIGHT_DEF = player_Original_Hunt_data[playerID].Character_LIGHT_DEF;
    userData[playerID].Character_BRIGHT_DMG = player_Original_Hunt_data[playerID].Character_BRIGHT_DMG;
    userData[playerID].Character_BRIGHT_DEF = player_Original_Hunt_data[playerID].Character_BRIGHT_DEF;
    userData[playerID].Character_DARK_DMG = player_Original_Hunt_data[playerID].Character_DARK_DMG;
    userData[playerID].Character_POISON_DMG = player_Original_Hunt_data[playerID].Character_POISON_DMG;
    userData[playerID].Character_POISON_DEF = player_Original_Hunt_data[playerID].Character_POISON_DEF;
    userData[playerID].Character_Status1 = player_Original_Hunt_data[playerID].Character_Status1;
    userData[playerID].Character_Status2 = player_Original_Hunt_data[playerID].Character_Status2;
    userData[playerID].Character_Status3 = player_Original_Hunt_data[playerID].Character_Status3;
    userData[playerID].Character_Status4 = player_Original_Hunt_data[playerID].Character_Status4;
    userData[playerID].Character_Status5 = player_Original_Hunt_data[playerID].Character_Status5;
    userData[playerID].Character_Status6 = player_Original_Hunt_data[playerID].Character_Status6;
}


module.exports = class fight_reward {
    constructor() {
        this.name = 'hend',
            this.alias = ['狩獵結束', 'he', '結束狩獵'],
            this.usage = '!hend'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        let Player_Info = userData[playerID];
        console.log(`使用者(ID: ${playerID})使用「狩獵結束」`)
        if(Player_Info.Character_Party != "組隊隊長"){
            return message.reply("你不是隊長，無法結束狩獵.").then(msg => {msg.delete(1000)});
        }


        let Party_LeaderID = Player_Info.Character_PartyLeader;
        let Party_Info = Player_Party[Party_LeaderID];
        

        if (Party_Info.Party_isHunt != "狩獵結束") return message.reply("現在無法結束狩獵").then(msg => {
            msg.delete(10000)
        });
        

        player_Hunt_reset(playerID);
        Party_Info.Party_Hunt_Target = "無"
        Party_Info.Party_isHunt = "無"
        Party_Info.Party_Share_Type = "隊長分配"
        Party_Info.Party_Treasure = "無"
        Party_Info.Party_Attack_Turn = 0
        Party_Info.Monster_Actually_Level = 0
        Party_Info.Monster_HP = 0
        Party_Info.Monster_Atk = 0
        Party_Info.Monster_Def = 0
        Party_Info.Monster_Target = playerID
        Party_Info.Monster_Strength = "無"
        Party_Info.Monster_Week = "無"
        Party_Info.Monster_Attack_Turn = 0 
        

        if (Party_Info.Party_Member1 != "無") {
            player_Hunt_reset(Party_Info.Party_Member1);
            delete player_Original_Hunt_data[Party_Info.Party_Member1]
        }
        if (Party_Info.Party_Member2 != "無") {
            player_Hunt_reset(Party_Info.Party_Member2);
            delete player_Original_Hunt_data[Party_Info.Party_Member2]
        }
        if (Party_Info.Party_Member3 != "無") {
            player_Hunt_reset(Party_Info.Party_Member3);
            delete player_Original_Hunt_data[Party_Info.Party_Member3]
        }
        if (Party_Info.Party_Member4 != "無") {            
            player_Hunt_reset(Party_Info.Party_Member4);
            delete player_Original_Hunt_data[Party_Info.Party_Member4]
        }
        if (Party_Info.Party_Member5 != "無") {            
            player_Hunt_reset(Party_Info.Party_Member5);
            delete player_Original_Hunt_data[Party_Info.Party_Member5]
        }

        message.reply("結束狩獵").then(msg => {
            msg.delete(10000)
        });


        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

    }
}