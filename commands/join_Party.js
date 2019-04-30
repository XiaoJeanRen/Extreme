const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const Joineparty = require("../players_party_data.json");

module.exports = class join_party {
    constructor() {
        this.name = 'joinParty',
            this.alias = ['加入組隊','組隊加入','加入隊伍','jp'],
            this.usage = '!joinParty'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let Player_Info = userData[playerID];
        if(Player_Info.Character_Party == "正在組隊中"){
            return message.reply("你已在某個組隊裡了.").then(msg => {msg.delete(1000)});
        }else if(Player_Info.Character_Party == "組隊隊長"){
            return message.reply("你是隊長，無法再加入隊伍.").then(msg => {msg.delete(1000)});
        }
        if (!message.mentions.members.first()) return message.reply("指令錯誤，指令格式為!jcp @使用者.").then(msg => {
            msg.delete(1000)
        });
        let Party_LeaderID = message.mentions.members.first().id; //獲得組隊隊長玩家id
        if (playerID == Party_LeaderID) return message.reply("你不能加入自己的組隊.").then(msg => {
            msg.delete(1000)
        });
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        if (!userData[Party_LeaderID]) return message.reply("對象不存在.").then(msg => {
            msg.delete(1000)
        });
        if(userData[Party_LeaderID].Character_Party != "組隊隊長") return message.reply("此人不是組隊隊長.").then(msg => {
            msg.delete(1000)
        });
        
        if(Joineparty[Party_LeaderID].Party_Member1 == "無"){
            Joineparty[Party_LeaderID].Party_Member1 = playerID;
        }else if(Joineparty[Party_LeaderID].Party_Member2 == "無"){
            Joineparty[Party_LeaderID].Party_Member2 = playerID;
        }else if(Joineparty[Party_LeaderID].Party_Member3 == "無"){
            Joineparty[Party_LeaderID].Party_Member3 = playerID;
        }else if(Joineparty[Party_LeaderID].Party_Member4 == "無"){
            Joineparty[Party_LeaderID].Party_Member4 = playerID;
        }else if(Joineparty[Party_LeaderID].Party_Member5 == "無"){
            Joineparty[Party_LeaderID].Party_Member5 = playerID;
        }else{
            return message.reply("此隊伍已滿.").then(msg => {
                msg.delete(1000)
            }); 
        }
        
        Player_Info.Character_Party = "正在組隊中";
        Player_Info.Character_PartyLeader = Party_LeaderID;
        message.reply("你已成功加入隊伍.").then(msg => {
            msg.delete(1000)
        });


        
        console.log(`使用者(ID: ${playerID})使用「加入隊伍」`)
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(Joineparty), (err) => {});
    }
}