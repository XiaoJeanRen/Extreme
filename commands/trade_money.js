const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");

//交易金錢指令
module.exports = class trade_item {
    constructor() {
        this.name = 'pay',
            this.alias = ['交易金錢'],
            this.usage = '!pay'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        if (!message.mentions.members.first()) return message.reply("你的交易對象不正確.").then(msg => {
            msg.delete(1000)
        });
        let tradePlayerID = message.mentions.members.first().id; //獲得金錢玩家id
        let tradePlayer = userData[playerID];       //扣除金錢玩家
        let getPlayer = userData[tradePlayerID];    //獲得金錢玩家
        console.log(`使用者(ID: ${playerID})使用「交易金錢」`)
        if (!userData[tradePlayerID]) return message.reply("交易對象不存在.").then(msg => {
            msg.delete(1000)
        });
        let payMoneyNumber = parseInt(args[2]);
        if (playerID == tradePlayerID) return message.reply("你不能給予自己金錢.").then(msg => {
            msg.delete(1000)
        });
        if (!payMoneyNumber || !tradePlayerID || isNaN(payMoneyNumber)) return message.reply("指令使用錯誤，金錢給予格式：「!pay <@使用者> <金錢數量>」").then(msg => {
            msg.delete(1000)
        });
        if (tradePlayer.money < payMoneyNumber){
            return message.reply("你的金錢不足.").then(msg => {
                msg.delete(1000)
            });
        }else{
            console.log(`使用者(ID: ${playerID})對使用者(ID: ${tradePlayerID})使用「交易金錢」成功，給予了${payMoneyNumber}元`)
            tradePlayer.Character_Money -= payMoneyNumber;
            getPlayer.Character_Money += payMoneyNumber;
            
            message.reply("付款成功.").then(msg => {
                msg.delete(1000)
            });
            fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        }
    }
}
