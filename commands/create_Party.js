const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const Createparty = require("../players_party_data.json");

module.exports = class create_party {
    constructor() {
        this.name = 'createParty',
            this.alias = ['建立組隊', '組隊建立', 'cp'],
            this.usage = '!createParty'
    }

    async run(bot, message, args) {
        await message.delete();
        /*if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });*/

        let playerID = message.author.id;
        let Player_Info = userData[playerID];
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        if (!args[1]) return message.reply("指令錯誤，指令格式為!cp 隊伍名稱").then(msg => {
            msg.delete(1000)
        });
        if (Player_Info.Character_Party == "正在組隊中") {
            return message.reply("你已在某個組隊裡了，無法創建隊伍.").then(msg => {
                msg.delete(1000)
            });
        } else if (Player_Info.Character_Party == "組隊隊長") {
            return message.reply("你是隊長，無法再創建隊伍.").then(msg => {
                msg.delete(1000)
            });
        }



        let Party_Name = args[1];
        Createparty[playerID] = {
            Party_Name: Party_Name,
            Party_Leader: playerID,
            Party_Member1: "無",
            Party_Member2: "無",
            Party_Member3: "無",
            Party_Member4: "無",
            Party_Member5: "無",
            Party_Member_Number: 1,
            Party_Hunt_Target: "無",
            Party_isHunt: "無",
            Party_Share_Type: "隊長分配",
            Party_Treasure: "無",
            Party_Attack_Turn: 0,
            Monster_Actually_Level: 0,
            Monster_HP: 0,
            Monster_Atk: 0,
            Monster_Def: 0,
            Monster_Target: playerID,
            Monster_Strength: "無",
            Monster_Week: "無",
            Monster_Attack_Turn: 0,
        }
        Player_Info.Character_Party = "組隊隊長";
        Player_Info.Character_PartyLeader = playerID;
        console.log(`使用者(ID: ${playerID})使用「創造隊伍」`)
        message.reply(`隊伍名稱「${Party_Name}」創建完成.`).then(msg => {
            msg.delete(5000)
        });
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(Createparty), (err) => {});
    }
}