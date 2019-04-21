const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const equip = require("../equip_ID_data");
const player_equip = require("../character_equip.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");

module.exports = class use_equip {
    constructor() {
        this.name = 'use_equip',
            this.alias = ['穿戴'],
            this.usage = '!use_equip'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let wear = function (itemID){
            userData[playerID].max_HP += equip[itemID].add_max_Hp;
            userData[playerID].max_MP += equip[itemID].add_max_Mp;
            userData[playerID].max_AP += equip[itemID].add_max_Ap;
            userData[playerID].max_Weight += equip[itemID].add_max_Weight;
            userData[playerID].atk += equip[itemID].add_atk;
            userData[playerID].def += equip[itemID].add_def;
        }
        let myinv_info = inv[playerID];
        let my_equip = player_equip[playerID];
        let itemID = args[1];
        if (!itemID) return message.reply("請輸入背包內的裝備id.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「穿戴」.`)
        if (itemID != myinv_info.default_inv.inv_1.itemID &&
            itemID != myinv_info.default_inv.inv_2.itemID &&
            itemID != myinv_info.default_inv.inv_3.itemID &&
            itemID != myinv_info.default_inv.inv_4.itemID &&
            itemID != myinv_info.default_inv.inv_5.itemID &&
            itemID != myinv_info.default_inv.inv_6.itemID &&
            itemID != myinv_info.default_inv.inv_7.itemID &&
            itemID != myinv_info.default_inv.inv_8.itemID &&
            itemID != myinv_info.default_inv.inv_9.itemID &&
            itemID != myinv_info.default_inv.inv_10.itemID) {
                console.log(`使用者(ID: ${playerID})使用「穿戴」失敗.`)
                return message.reply("你沒有此裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
        }else{
            if(equip[itemID].item_Type != "裝備"){
                return message.reply("此物品不是裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
            }else{
                if(equip[itemID].equip_Type == "武器"){
                    if(my_equip.weapon1 == "000"){
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
                        wear(itemID);
                        message.reply("武器裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }else if(my_equip.weapon2 == "無"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID);
                        message.reply("武器裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }else{
                        return message.reply("你的武器欄已滿，請脫下武器");
                    }
                }
            }
        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) =>{
        });
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
        });
        fs.writeFile("./character_equip.json", JSON.stringify(my_equip), (err) =>{
        });
        console.log(`使用者(ID: ${playerID})使用「穿戴」成功.`)
    }
}