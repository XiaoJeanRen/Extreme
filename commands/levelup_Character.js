const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//角色升級指令

module.exports = class trade_item {
    constructor() {
        this.name = 'levelup',
            this.alias = ['角色升級'],
            this.usage = '!levelup'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        let userLevelup = userData[playerID];
        let nextLevelExp = userLevelup.level * 300 * 2.5;
        let difference = nextLevelExp - userLevelup.exp;

        if (userLevelup.exp < nextLevelExp) {
            return message.reply(`經驗不足，你還差${difference}經驗可以升級`).then(msg => {
                msg.delete(1000)
            });
        } else {
            message.reply(`開始進行「升級」，本次升級將消耗${nextLevelExp}經驗值，你確定要升級嗎?(yes / no)`).then(msg => {
                msg.delete(20000)
            });
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000
            }).then(collection => {
                let yesOrno = collection.first().content;
                if (!collection.first().content) return message.reply("取消").then(msg => {
                    msg.delete(5000)
                });
                if (yesOrno == "no" || yesOrno == "No" || yesOrno == "NO") return message.reply("取消").then(msg => {
                    msg.delete(5000)
                });
                if (yesOrno == "Yes" || yesOrno == "yes") {
                    let preLevel = userLevelup.level;
                    userLevelup.level += 1;
                    userLevelup.exp -= nextLevelExp;
                    difference = nextLevelExp - userLevelup.exp;
                    let levelUpEmbed = new Discord.RichEmbed()
                    .setTitle(`🌍世界之聲🌍`)
                    .setColor("##00cc00")
                    .addField("你升級了Level 🆙", `Level. ${preLevel} ➡ Level. ${preLevel+1}`)
                    .addField("等級", "**目前等級：**" + userLevelup.level + "** 目前經驗：**" + userLevelup.exp)
                    .setFooter(`離下一個等級還有 ${difference} 經驗值`, message.author.displayAvatarURL);
                    message.reply(levelUpEmbed).then(msg => {
                        msg.delete(5000)
                    });
                }
            }).catch(err => {
                //console.log(err)
                return message.reply("取消").then(msg => {
                    msg.delete(1000)
                });
            });

        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
    }
}