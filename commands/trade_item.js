const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
//交易道具指令
let checkItem = function (tradePlayer_info, itemID) {
    if (itemID == tradePlayer_info.inv_1.itemID) {
        tradePlayer_info.inv_1.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_2.itemID) {
        tradePlayer_info.inv_2.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_3.itemID) {
        tradePlayer_info.inv_3.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_4.itemID) {
        tradePlayer_info.inv_4.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_5.itemID) {
        tradePlayer_info.inv_5.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_6.itemID) {
        tradePlayer_info.inv_6.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_7.itemID) {
        tradePlayer_info.inv_7.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_8.itemID) {
        tradePlayer_info.inv_8.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_9.itemID) {
        tradePlayer_info.inv_9.itemID = "000";

    } else if (itemID == tradePlayer_info.inv_10.itemID) {
        tradePlayer_info.inv_10.itemID = "000";
    }
}
module.exports = class trade_item {
    constructor() {
        this.name = 'trade_item',
            this.alias = ['交易道具', 'tradeitem'],
            this.usage = '!trade_item'
    }

    async run(bot, message, args) {
        await message.delete();
        if (!message.mentions.members.first()) return message.reply("你的交易對象不正確.").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        let Player_info = userData[playerID];
        if (Player_info.Character_Adventure == "正在冒險" || Player_info.Character_Adventure == "正在狩獵") return message.reply("你正在冒險或狩獵，無法進行交易.").then(msg => {
            msg.delete(10000)
        });
        if (Player_info.Character_HP <= 0) return message.reply("你似乎已經死亡了...請輸入!revive").then(msg => {
            msg.delete(10000)
        });

        let tradePlayerID = message.mentions.members.first().id;
        console.log(`使用者(ID: ${playerID})使用「交易道具」`)
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        if (!userData[tradePlayerID]) return message.reply("交易對象不存在.").then(msg => {
            msg.delete(1000)
        });
        let itemID = args[2];
        if (playerID == tradePlayerID) return message.reply("你不能給予自己物品.").then(msg => {
            msg.delete(1000)
        });
        if (!itemID || !tradePlayerID || itemID == "000") return message.reply("物品給予格式：「!tradeitem <@使用者> <itemID>」").then(msg => {
            msg.delete(1000)
        });

        let tradePlayer_info = inv[playerID];
        let getPlayer_info = inv[tradePlayerID];

        /**
         * 檢查交易玩家背包內有無選擇道具
         */
        if (itemID != tradePlayer_info.inv_1.itemID &&
            itemID != tradePlayer_info.inv_2.itemID &&
            itemID != tradePlayer_info.inv_3.itemID &&
            itemID != tradePlayer_info.inv_4.itemID &&
            itemID != tradePlayer_info.inv_5.itemID &&
            itemID != tradePlayer_info.inv_6.itemID &&
            itemID != tradePlayer_info.inv_7.itemID &&
            itemID != tradePlayer_info.inv_8.itemID &&
            itemID != tradePlayer_info.inv_9.itemID &&
            itemID != tradePlayer_info.inv_10.itemID) {
            console.log(`使用者(ID: ${playerID})對使用者(ID: ${tradePlayerID})使用「交易道具」失敗.`)
            return message.reply("你沒有此裝備，請再次確認.").then(msg => {
                msg.delete(5000)
            });
        } else {
            /**
             * 檢查得到道具玩家的背包是否已滿
             */
            if (getPlayer_info.inv_1.itemID == "000") {
                getPlayer_info.inv_1 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_2.itemID == "000") {
                getPlayer_info.inv_2 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_3.itemID == "000") {
                getPlayer_info.inv_3 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_4.itemID == "000") {
                getPlayer_info.inv_4 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_5.itemID == "000") {
                getPlayer_info.inv_5 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_6.itemID == "000") {
                getPlayer_info.inv_6 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_7.itemID == "000") {
                getPlayer_info.inv_7 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_8.itemID == "000") {
                getPlayer_info.inv_8 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_9.itemID == "000") {
                getPlayer_info.inv_9 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else if (getPlayer_info.inv_10.itemID == "000") {
                getPlayer_info.inv_10 = {
                    itemID: itemID
                }
                checkItem(tradePlayer_info, itemID);
            } else {
                return message.reply("此玩家背包已滿.").then(msg => {
                    msg.delete(1000)
                });
            }
            message.reply("給予裝備完成.").then(msg => {
                msg.delete(1000)
            });
            console.log(`使用者(ID: ${playerID})對使用者(ID: ${tradePlayerID})使用「交易道具」成功，
            給予道具(id:${itemID}).`)
            fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
        }
    }
}