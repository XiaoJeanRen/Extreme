const Discord = require("discord.js");
const userData = require("../players_data.json");

//查看副本地圖指令
module.exports = class adventure_maps {
    constructor() {
        this.name = 'adventures',
        this.alias = ['冒險地圖','advs'],
        this.usage = '!adventures'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        console.log(`使用者(ID: ${playerID})使用「冒險地圖」`)
        let advmapsEmbed = new Discord.RichEmbed()
        .setTitle("副本列表")
        .addField("副本名稱「平原」，副本id「001」","敘述：「平凡的平原，有些許史萊姆出沒」")
        .addField("副本名稱「森林」，副本id「002」","敘述：「王國附近的森林，有動物和哥布林出沒」");
        

        message.reply(advmapsEmbed).then(msg => {
                msg.delete(20000)
            });;
        
    }
}