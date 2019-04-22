const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const player_equip = require("../character_equip.json");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");

let checkItem = function(itemID, playerID){
    if(itemID == myinv_info.default_inv.inv_1.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_1.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_2.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_2.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_3.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_3.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_4.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_4.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_5.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_5.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_6.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_6.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_7.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_7.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_8.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_8.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_9.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_9.itemID = "000";
    }else if(itemID == myinv_info.default_inv.inv_10.itemID){
        my_equip.weapon1 = itemID;
        myinv_info.default_inv.inv_10.itemID = "000";
    }
}
module.exports = class create_Character {
    constructor() {
        this.name = 'trade_item',
            this.alias = ['交易道具', 'tradeitem'],
            this.usage = '!trade_item'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let tradePlayerID = message.mentions.members.first().id;
        console.log(`使用者(ID: ${playerID})使用「交易道具」`)
        let itemID = args[2];
        if (!itemID || !tradePlayerID) return message.reply("物品給予格式：「!tradeitem <@使用者> <itemID>」").then(msg => {
            msg.delete(1000)
        });

        tradePlayer_info = inv[playerID];
        getPlayer_info = inv[tradePlayerID];

        /**
         * 檢查交易玩家背包內有無選擇道具
         */
        if (itemID != tradePlayer_info.default_inv.inv_1.itemID &&
            itemID != tradePlayer_info.default_inv.inv_2.itemID &&
            itemID != tradePlayer_info.default_inv.inv_3.itemID &&
            itemID != tradePlayer_info.default_inv.inv_4.itemID &&
            itemID != tradePlayer_info.default_inv.inv_5.itemID &&
            itemID != tradePlayer_info.default_inv.inv_6.itemID &&
            itemID != tradePlayer_info.default_inv.inv_7.itemID &&
            itemID != tradePlayer_info.default_inv.inv_8.itemID &&
            itemID != tradePlayer_info.default_inv.inv_9.itemID &&
            itemID != tradePlayer_info.default_inv.inv_10.itemID) {
            console.log(`使用者(ID: ${playerID})使用「交易道具」失敗.`)
            return message.reply("你沒有此裝備，請再次確認.").then(msg => {
                msg.delete(5000)
            });
        }else{
            /**
             * 檢查得到道具玩家的背包是否已滿
             */
            if(getPlayer_info.default_inv.inv_1.itemID == "000"){
                getPlayer_info.default_inv.inv_1 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_2.itemID == "000"){
                getPlayer_info.default_inv.inv_2 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_3.itemID == "000"){
                getPlayer_info.default_inv.inv_3 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_4.itemID == "000"){
                getPlayer_info.default_inv.inv_4 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_5.itemID == "000"){
                getPlayer_info.default_inv.inv_5 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_6.itemID == "000"){
                getPlayer_info.default_inv.inv_6 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_7.itemID == "000"){
                getPlayer_info.default_inv.inv_7 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_8.itemID == "000"){
                getPlayer_info.default_inv.inv_8 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_9.itemID == "000"){
                getPlayer_info.default_inv.inv_9 ={
                    itemID: itemID
                }
            }else if(getPlayer_info.default_inv.inv_10.itemID == "000"){
                getPlayer_info.default_inv.inv_10 ={
                    itemID: itemID
                } 
            }else{
                return message.reply("此玩家背包已滿.").then(msg => {
                    msg.delete(1000)
                });
            }
        }
    }
}