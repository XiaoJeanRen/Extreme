const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const Deleteeparty = require("../players_party_data.json");

module.exports = class delete_party {
    constructor() {
        this.name = 'deleteParty',
            this.alias = ['解散組隊','組隊解散','dp'],
            this.usage = '!deleteParty'
    }

    async run(bot, message, args) {
        await message.delete();
        
        let playerID = message.author.id;
        let Player_Info = userData[playerID];
        let Party_LeaderID = Player_Info.Character_PartyLeader;
        
        if(Player_Info.Character_Party != "組隊隊長"){
            return message.reply("你不是隊長，無法解散組隊.").then(msg => {msg.delete(1000)});
        }
        if (Player_Info.Character_Hunt == "正在共同狩獵") return message.reply("無法在狩獵中解散隊伍.").then(msg => {
            msg.delete(10000)
        });
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        
        if(Deleteeparty[Party_LeaderID].Party_Member1 != "無"){
            userData[Deleteeparty[Party_LeaderID].Party_Member1].Character_Party = "無"
            userData[Deleteeparty[Party_LeaderID].Party_Member1].Character_PartyLeader = "無"
        }
        if(Deleteeparty[Party_LeaderID].Party_Member2 != "無"){
            userData[Deleteeparty[Party_LeaderID].Party_Member2].Character_Party = "無"
            userData[Deleteeparty[Party_LeaderID].Party_Member2].Character_PartyLeader = "無"
        }
        if(Deleteeparty[Party_LeaderID].Party_Member3 != "無"){
            userData[Deleteeparty[Party_LeaderID].Party_Member3].Character_Party = "無"
            userData[Deleteeparty[Party_LeaderID].Party_Member3].Character_PartyLeader = "無"
        }
        if(Deleteeparty[Party_LeaderID].Party_Member4 != "無"){
            userData[Deleteeparty[Party_LeaderID].Party_Member4].Character_Party = "無"
            userData[Deleteeparty[Party_LeaderID].Party_Member4].Character_PartyLeader = "無"
        }
        if(Deleteeparty[Party_LeaderID].Party_Member5 != "無"){
            userData[Deleteeparty[Party_LeaderID].Party_Member5].Character_Party = "無"
            userData[Deleteeparty[Party_LeaderID].Party_Member5].Character_PartyLeader = "無"
        }
    
        delete Deleteeparty[playerID]; //刪除隊五資料

        Player_Info.Character_Party = "無";
        Player_Info.Character_PartyLeader = "無";
        console.log(`使用者(ID: ${playerID})使用「解散隊伍」`)
        message.reply("隊伍已解散.").then(msg => {
            msg.delete(1000)
        });


        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(Deleteeparty), (err) => {});
    }
}