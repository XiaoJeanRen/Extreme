const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const Player_Party = require("../players_party_data.json");

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
            itemID != myinv_info.invh_3.itemID) {
            console.log(`使用者(ID: ${playerID})使用「狩獵目標」失敗.`)
            return message.reply("你沒有此狩獵目標，請再次確認.").then(msg => {
                msg.delete(5000)
            });
        } else {
            if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
                msg.delete(1000)
            });
            
            Player_Info.Character_Hunt = "正在共同狩獵";
            Player_Party[playerID].Party_Hunt_Target = itemID;
            Player_Party[playerID].Party_isHunt = "正在狩獵";
            let Party_LeaderID = Player_Info.Character_PartyLeader;
            var Party_Member_Numbers = Player_Party[playerID].Party_Member_Number;
            
            if (Player_Party[Party_LeaderID].Party_Member1 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member1].Character_Hunt = "正在共同狩獵"
                
            }
            if (Player_Party[Party_LeaderID].Party_Member2 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member2].Character_Hunt = "正在共同狩獵"
                
            }
            if (Player_Party[Party_LeaderID].Party_Member3 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member3].Character_Hunt = "正在共同狩獵"
                
            }
            if (Player_Party[Party_LeaderID].Party_Member4 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member4].Character_Hunt = "正在共同狩獵"
                
            }
            if (Player_Party[Party_LeaderID].Party_Member5 != "無") {
                userData[Player_Party[Party_LeaderID].Party_Member5].Character_Hunt = "正在共同狩獵"
                
            }
        }



        console.log(`使用者(ID: ${playerID})使用「共同狩獵」`)
        message.reply(`共同狩獵「${itemID}」開始.\n提示：挑戰人數為${Party_Member_Numbers}人，這代表著你每執行${Party_Member_Numbers}次行動，狩獵對象將攻擊你的隊伍.`).then(msg => {
            msg.delete(20000)
        });

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_party_data.json", JSON.stringify(Player_Party), (err) => {});
    }
}