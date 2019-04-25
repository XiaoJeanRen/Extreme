const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//玩家更改自訂顏色指令
module.exports = class recolor {
    constructor() {
        this.name = 'recolor',
            this.alias = ['修改顏色'],
            this.usage = '!recolor'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「修改顏色」`)
        message.reply("開始更改自訂顏色，請輸入新的「顏色代碼」\n本指令使用16進位碼，請善用此網址\n https://www.ebaomonthly.com/window/photo/lesson/colorList.htm \n輸入cancel取消.");
        const filter = m => m.author.id === message.author.id;

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000
        }).then(collection => {
            let newColor = collection.first().content;
            if (!collection.first().content) return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            if (newColor == "cancel") return message.reply("取消").then(msg => {
                msg.delete(5000)
            });
            userData[playerID].Character_Color = newColor;
            message.reply(`自訂顏色更改完成，新顏色代碼為「${newColor}」`).then(msg => {msg.delete(10000)});
        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        })
    }
}