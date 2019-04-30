const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const PartyData = require("../players_party_data.json");
//查看背包指令
module.exports = class myParty{
  constructor(){
    this.name = 'myparty',
    this.alias = ['隊伍','組隊資訊','myp'],
    this.usage = '!myparty'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let Player_info = userData[playerID];
    let Party_info = PartyData[Player_info.Character_PartyLeader];
    
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    if (Player_info.Character_Party == "無") return message.reply("你沒有隊伍.").then(msg => {msg.delete(1000)});

    let Party_Leader = userData[Party_info.Party_Leader].CharacterName;

    
    let Party_Member1 = "無"
    if (!userData[Party_info.Party_Member1]){
        Party_Member1="無";
    } else{
        Party_Member1= userData[Party_info.Party_Member1].CharacterName;
    }

    let Party_Member2 = "無"
    if (!userData[Party_info.Party_Member2]){
        Party_Member2="無";
    } else{
        Party_Member2= userData[Party_info.Party_Member2].CharacterName;
    }
    
    let Party_Member3 = "無"
    if (!userData[Party_info.Party_Member3]){
        Party_Member3="無";
    } else{
        Party_Member3= userData[Party_info.Party_Member3].CharacterName;
    }

    let Party_Member4 = "無"
    if (!userData[Party_info.Party_Member4]){
        Party_Member4="無";
    } else{
        Party_Member4= userData[Party_info.Party_Member4].CharacterName;
    }

    let Party_Member5 = "無"
    if (!userData[Party_info.Party_Member5]){
        Party_Member5="無";
    } else{
        Party_Member5= userData[Party_info.Party_Member5].CharacterName;
    }


    let partyEmbed = new Discord.RichEmbed()
    .setTitle("**隊伍列表**")
    .addField(Party_info.Party_Name,
    "**隊長： **`玩家名稱: " + Party_Leader  + "`\n"+
    "**隊員1： **`玩家名稱: " + Party_Member1  + "`\n"+
    "**隊員2： **`玩家名稱: " + Party_Member2  + "`\n"+
    "**隊員3： **`玩家名稱: " + Party_Member3  + "`\n"+
    "**隊員4： **`玩家名稱: " + Party_Member4  + "`\n"+
    "**隊員5： **`玩家名稱: " + Party_Member5 + "`"
    )

    message.reply(partyEmbed).then(msg => {msg.delete(10000)});
  }
}