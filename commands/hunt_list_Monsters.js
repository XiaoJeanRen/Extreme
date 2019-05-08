const Discord = require("discord.js");
const userData = require("../players_data.json");

//查看副本地圖指令
module.exports = class monsters {
    constructor() {
        this.name = 'monsterList',
            this.alias = ['魔物列表', 'monsterlist', 'ml'],
            this.usage = '!monsterList'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「魔物列表」`)
        let page = args[1];
        if (!args[1]) {}
        switch (page) {
            case '1':
            default:
                let monstersEmbed1 = new Discord.RichEmbed()
                    .setTitle("魔物列表 page. 1")
                    .addField("魔物名稱「史萊姆」", "敘述：「女性冒險者不想接近的生物，她們寧願打跳級打蜘蛛。」")
                    .addField("魔物名稱「大蜘蛛」", "敘述：「這麼大的蜘蛛，娘化一定很可愛。」")
                    .addField("魔物名稱「哥布林」", "敘述：「我看過的本子很多，我知道接下來會發生什麼事。」")
                    .addField("魔物名稱「骷髏弓手」", "敘述：「很久很久以前......或最近化為白骨的魔物。」")
                    .addField("魔物名稱「骷髏劍士」", "敘述：「很久很久以前......或最近化為白骨的魔物。」")
                    .addField("魔物名稱「骷髏法師」", "敘述：「很久很久以前......或最近化為白骨的魔物。」")
                    .addField("魔物名稱「怪異的牛」", "敘述：「因為奇怪力量變異的牛。」")
                    .addField("魔物名稱「怪異的豬」", "敘述：「因為奇怪力量變異的豬。」")
                    .addField("魔物名稱「怪異的雞」", "敘述：「因為奇怪力量變異的雞。」")
                message.reply(monstersEmbed1).then(msg => {
                    msg.delete(30000)
                });;
                break;
            case '2':
                let monstersEmbed2 = new Discord.RichEmbed()
                    .setTitle("副本列表")
                    .addField("副本名稱「平原」，副本id「001」", "敘述：「平凡的平原，有些許史萊姆出沒」")
                    .addField("副本名稱「森林」，副本id「002」", "敘述：「王國附近的森林，有動物和哥布林出沒」");
                message.reply(monstersEmbed2).then(msg => {
                    msg.delete(30000)
                });;
                break;


        }

    }
}