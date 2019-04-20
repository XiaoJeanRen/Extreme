const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../users_data.json");
const equip = require("../character_equip.json");
module.exports = class reset {
    constructor() {
        this.name = 'reset',
            this.alias = ['GM重置'],
            this.usage = '!reset'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {msg.delete(1000)});
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「重置」`)

        fs.writeFile("./users_data.json", JSON.stringify({}), (err) => {
            
        });
        fs.writeFile("./character_equip.json", JSON.stringify({}), (err) => {
            
        });

        message.reply("GM重置資料庫完成").then(msg => {
            msg.delete(10000)
        });

    }

}