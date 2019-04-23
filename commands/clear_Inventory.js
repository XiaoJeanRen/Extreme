const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
// 丟棄裝備指令
let clearAllItem = function (myinv_info) {
    myinv_info.default_inv.inv_1.itemID = "000";
    myinv_info.default_inv.inv_2.itemID = "000";
    myinv_info.default_inv.inv_3.itemID = "000";
    myinv_info.default_inv.inv_4.itemID = "000";
    myinv_info.default_inv.inv_5.itemID = "000";
    myinv_info.default_inv.inv_6.itemID = "000";
    myinv_info.default_inv.inv_7.itemID = "000";
    myinv_info.default_inv.inv_8.itemID = "000";
    myinv_info.default_inv.inv_9.itemID = "000";
    myinv_info.default_inv.inv_10.itemID = "000";
}

module.exports = class clearItem {
    constructor() {
        this.name = 'clearInv',
            this.alias = ['清理背包','clearinv'],
            this.usage = '!clearInv'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        let myinv_info = inv[playerID];
        message.reply(`本指令將會清除你背包內的道具，你確定要清除嗎?(yes / no)`).then(msg => {
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
                clearAllItem(myinv_info);
                console.log(`使用者(ID: ${playerID})使用「清理背包」.`)
                message.reply(`清理背包成功.`).then(msg => {
                    msg.delete(5000)
                });
                fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
            }
        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        })
    }
}