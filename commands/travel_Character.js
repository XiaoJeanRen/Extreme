const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//玩家更名指令
module.exports = class travel {
    constructor() {
        this.name = 'travel',
            this.alias = ['旅行','travel']
            this.usage = '!rename'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        console.log(`使用者(ID: ${playerID})使用「角色創建」`)
        message.reply("開始更改角色名稱，請輸入新的「角色名稱」，輸入cancel取消.");
        const filter = m => m.author.id === message.author.id;

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000
        }).then(collection => {
            let newCharacterName = collection.first().content;
            if (!collection.first().content) return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            if (newCharacterName == "cancel") return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            userData[playerID].CharacterName = newCharacterName;
            message.reply(`角色更名完成，新名稱為「${newCharacterName}」創建完成`).then(msg => {msg.delete(10000)});
        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        })
    }
}