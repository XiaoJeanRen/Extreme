const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");

//查看角色狀態指令
module.exports = class classInfo {
    constructor() {
        this.name = 'classinfo',
            this.alias = ['職業資訊','職業資料','cli'],
            this.usage = '!classinfo'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let info = userData[playerID];
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「職業資訊」`)
        


        let classEmbed = new Discord.RichEmbed()

            .setTitle("**__職業特性__**")
            .addField("戰士特性",
                "「堅定」無屬性異常狀態效果減少\n「奮力」普通攻擊額外傷害"
            );
        message.reply(classEmbed).then(msg => {
            msg.delete(20000)
        });


    }

}