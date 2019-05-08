const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const CreateMaterial = require("../default_material_data.json");

module.exports = class create_item {
    constructor() {
        this.name = 'createA',
            this.alias = ['ca','創造素材'],
            this.usage = '!createA'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });

        if (!args[1]) return message.reply("指令錯誤，指令格式為!ca 素材名稱").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        let MaterialName = args[1]
        CreateMaterial[MaterialName] = 0
        console.log(`使用者(ID: ${playerID})使用「創造物品」`)
        message.reply(`物品名稱「${MaterialName}」創建完成.`).then(msg => {
            msg.delete(5000)
        });
        fs.writeFile("./default_material_data.json", JSON.stringify(CreateMaterial), (err) => {});
    }
}