const Discord = require("discord.js");
const userData = require("../players_data.json");

//查看副本地圖指令
module.exports = class monsters {
    constructor() {
        this.name = 'monsterList',
            this.alias = ['怪物列表', 'monsterlist', 'ml'],
            this.usage = '!monsterList'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「怪物列表」`)
        let page = args[1];
        if (!args[1]) {}
        switch (page) {
            case '2':
                let monstersEmbed2 = new Discord.RichEmbed()
                    .setTitle("副本列表")
                    .addField("副本名稱「平原」，副本id「001」", "敘述：「平凡的平原，有些許史萊姆出沒」")
                    .addField("副本名稱「森林」，副本id「002」", "敘述：「王國附近的森林，有動物和哥布林出沒」");
                message.reply(monstersEmbed2).then(msg => {
                    msg.delete(30000)
                });;
                break;
            case '1':
            default:
                let monstersEmbed1 = new Discord.RichEmbed()
                    .setTitle("怪物列表 page. 1")
                    .addField("怪物名稱「史萊姆」，怪物ID「1000」，建議等級Level 1", "敘述：「女性冒險者不想接近的生物，她們寧願打跳級打蜘蛛。」")
                    .addField("怪物名稱「大蜘蛛」，怪物ID「1001」，建議等級Level 3", "敘述：「這麼大！看著看著感覺比家裡的蜘蛛還可愛。」")
                    .addField("怪物名稱「哥布林」，怪物ID「1002」，建議等級Level 5", "敘述：「我看過的本子很多，我知道接下來會發生什麼事。」")
                    .addField("怪物名稱「骷髏弓手」，怪物ID「1003」，建議等級Level 7", "敘述：「很久很久以前......或最近化為白骨的魔物。」")
                    .addField("怪物名稱「骷髏劍士」，怪物ID「1004」，建議等級Level 7", "敘述：「很久很久以前......或最近化為白骨的魔物。」")
                    .addField("怪物名稱「骷髏法師」，怪物ID「1005」，建議等級Level 10", "敘述：「很久很久以前......或最近化為白骨的魔物。」")
                message.reply(monstersEmbed1).then(msg => {
                    msg.delete(30000)
                });;
                break;

        }

    }
}