const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const Leaveparty = require("../players_party_data.json");

module.exports = class leave_party {
    constructor() {
        this.name = 'leaveParty',
            this.alias = ['離開組隊','組隊離開','lp'],
            this.usage = '!leaveParty'
    }

    async run(bot, message, args) {
        await message.delete();

        let playerID = message.author.id;
        let Player_Info = userData[playerID];
        let Party_LeaderID = Player_Info.Character_PartyLeader;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        if(Player_Info.Character_Party == "組隊隊長"){
            return message.reply("你是隊長，請輸入!解散隊伍.").then(msg => {msg.delete(1000)});
        }
        if(Player_Info.Character_Party == "無"){
            return message.reply("你不在任何隊伍裡.").then(msg => {msg.delete(1000)});
        }
        

        if(Leaveparty[Party_LeaderID].Party_Member1 == playerID){
            Leaveparty[Party_LeaderID].Party_Member1 = "無";
        }else if(Leaveparty[Party_LeaderID].Party_Member2 == playerID){
            Leaveparty[Party_LeaderID].Party_Member2 = "無";
        }else if(Leaveparty[Party_LeaderID].Party_Member3 == playerID){
            Leaveparty[Party_LeaderID].Party_Member3 = "無";
        }else if(Leaveparty[Party_LeaderID].Party_Member4 == playerID){
            Leaveparty[Party_LeaderID].Party_Member4 = "無";
        }else if(Leaveparty[Party_LeaderID].Party_Member5 == playerID){
            Leaveparty[Party_LeaderID].Party_Member5 = "無";
        }else{
            return message.reply("此錯誤.").then(msg => {
                msg.delete(1000)
            }); 
        }
        Player_Info.Character_Party = "無";
        Player_Info.Character_PartyLeader = "無";
        console.log(`使用者(ID: ${playerID})使用「離開隊伍」`)
        message.reply("已離開隊伍.").then(msg => {
            msg.delete(1000)
        });


        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(Leaveparty), (err) => {});
    }
}