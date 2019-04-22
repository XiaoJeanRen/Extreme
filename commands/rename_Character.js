const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//玩家更名指令
module.exports = class rename {
    constructor() {
        this.name = 'rename',
            this.alias = ['更名','重新命名'],
            this.usage = '!rename'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
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
            userData[playerID].characterName = newCharacterName;
            message.reply(`角色更名完成，新名稱為「${newCharacterName}」創建完成`).then(msg => {msg.delete(10000)});
        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        })
    }
}