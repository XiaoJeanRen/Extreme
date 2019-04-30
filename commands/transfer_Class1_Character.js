const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//角色升級指令

module.exports = class transfer1 {
    constructor() {
        this.name = 'transfer_1',
            this.alias = ['轉職1轉','轉職'],
            this.usage = '!transfer_1'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let transferPlayer = userData[playerID];
        console.log(`使用者(ID: ${playerID})使用「轉職1轉」`)
        if (!transferPlayer) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });
        let transferClass = args[1];
        if (!args[1]) return message.reply("指令錯誤，指令格式為 !transfer_1 <職業>，輸入!cli確認職業詳細資料").then(msg => {
            msg.delete(10000)
        });
        if (transferPlayer.level < 10) {
            console.log(`使用者(ID: ${playerID})使用「轉職1轉」失敗`)
            return message.reply(`等級不足，一轉至少需要「等級10」.`).then(msg => {
                msg.delete(1000)
            });
            
        } else {
            if (transferClass != "戰士" || transferClass != "法師" || transferClass != "牧師" ||
            transferClass != "小偷" || transferClass != "弓手" || transferClass != "騎士") return message.reply(`等級不足，一轉至少需要「等級10」.`).then(msg => {
                msg.delete(1000)
            });
            
            message.reply(`開始進行「轉職」，你選擇的職業是「${transferClass}」，你確定要轉職嗎?(yes / no)`).then(msg => {
                msg.delete(20000)
            });
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000
            }).then(collection => {
                let yesOrno = collection.first().content;
                if (yesOrno == "no" || yesOrno == "No" || yesOrno == "NO") return message.reply("取消").then(msg => {
                    msg.delete(5000)
                });
                if (yesOrno == "Yes" || yesOrno == "yes") {
                    console.log(`使用者(ID: ${playerID})使用「轉職1轉」成功`)
                    transferPlayer.class = transferClass;
                    message.reply(`「${transferClass}」轉職成功.`).then(msg => {
                        msg.delete(20000)
                    });
                }
                
            }).catch(err => {
                //console.log(err)
                return message.reply("取消").then(msg => {
                    msg.delete(1000)
                });
            });
            console.log(transferClass)

        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
    }
}