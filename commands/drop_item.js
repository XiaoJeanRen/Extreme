const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const allitem = require("../all_item_id_data.json");
// 丟棄裝備指令
let checkItem = function (myinv_info, itemID) {
    if (itemID == myinv_info.inv_1.itemID) {
        myinv_info.inv_1.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_2.itemID) {
        myinv_info.inv_2.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_3.itemID) {
        myinv_info.inv_3.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_4.itemID) {
        myinv_info.inv_4.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_5.itemID) {
        myinv_info.inv_5.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_6.itemID) {
        myinv_info.inv_6.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_7.itemID) {
        myinv_info.inv_7.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_8.itemID) {
        myinv_info.inv_8.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_9.itemID) {
        myinv_info.inv_9.itemID = "000";
        delete allitem[itemID];

    } else if (itemID == myinv_info.inv_10.itemID) {
        myinv_info.inv_10.itemID = "000";
        delete allitem[itemID];
    }
}

module.exports = class drop {
    constructor() {
        this.name = 'drop',
            this.alias = ['丟棄'],
            this.usage = '!drop'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        let myinv_info = inv[playerID];
        let itemID = args[1];
        if (!itemID || itemID == "000") return message.reply("請輸入背包內的裝備id.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「丟棄」.`)
        if (itemID != myinv_info.inv_1.itemID &&
            itemID != myinv_info.inv_2.itemID &&
            itemID != myinv_info.inv_3.itemID &&
            itemID != myinv_info.inv_4.itemID &&
            itemID != myinv_info.inv_5.itemID &&
            itemID != myinv_info.inv_6.itemID &&
            itemID != myinv_info.inv_7.itemID &&
            itemID != myinv_info.inv_8.itemID &&
            itemID != myinv_info.inv_9.itemID &&
            itemID != myinv_info.inv_10.itemID) {
                console.log(`使用者(ID: ${playerID})使用「丟棄」失敗.`)
                return message.reply("你沒有此裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
        }else{
            checkItem(myinv_info,itemID);
            message.reply(`丟棄裝備成功，裝備ID: ${itemID}.`).then(msg => {
                msg.delete(5000)
            });
            fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
            });
            fs.writeFile("./all_item_id_data.json", JSON.stringify(allitem), (err) => {});
        }
    }
}