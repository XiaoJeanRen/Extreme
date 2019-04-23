const Discord = require("discord.js");
const userData = require("../players_data.json");
const fs = require("fs");
const shops = require("../system_shops.json");
//查看副本地圖指令
module.exports = class system_shops {
    constructor() {
        this.name = 'gshops',
        this.alias = ['系統商店清單','shops','gs'],
        this.usage = '!gshops'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        let syShopsEmbed = new Discord.RichEmbed()
        .setTitle("系統開設的商店列表")
        .addField(shops["001"].shopName + " 001", "簡介：" + shops["001"].shopInfo)
        .addField(shops["002"].shopName + " 002", "簡介：" + shops["002"].shopInfo)
        .addField(shops["003"].shopName + " 003", "簡介：" + shops["003"].shopInfo)
        .addField(shops["004"].shopName + " 004", "簡介：" + shops["004"].shopInfo)
        
        console.log(`使用者(ID: ${playerID})使用「系統商店清單」完成.`)
        message.reply(syShopsEmbed).then(msg => {msg.delete(20000)});
    }
}