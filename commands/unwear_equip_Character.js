const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const player_equip = require("../character_equip.json");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");

module.exports = class wear_equip {
    constructor() {
        this.name = 'unwear',
            this.alias = ['脫下'],
            this.usage = '!unwear'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let unwear = function (itemID) {
            userData[playerID].max_HP -= equip[itemID].add_max_Hp;
            userData[playerID].max_MP -= equip[itemID].add_max_Mp;
            userData[playerID].max_AP -= equip[itemID].add_max_Ap;
            userData[playerID].max_Weight -= equip[itemID].add_max_Weight;
            userData[playerID].atk -= equip[itemID].add_atk;
            userData[playerID].def -= equip[itemID].add_def;
            if (itemID == player_equip[playerID].weapon1){
                player_equip[playerID].weapon1 = "000"
            }else if(itemID == player_equip[playerID].weapon2){
                player_equip[playerID].weapon2 = "000"
            }else if(itemID == player_equip[playerID].head){
                player_equip[playerID].head = "000"
            }else if(itemID == player_equip[playerID].body){
                player_equip[playerID].body = "000"
            }else if(itemID == player_equip[playerID].gloves){
                player_equip[playerID].gloves = "000"
            }else if(itemID == player_equip[playerID].leg){
                player_equip[playerID].leg = "000"
            }else if(itemID == player_equip[playerID].boots){
                player_equip[playerID].boots = "000"
            }else if(itemID == player_equip[playerID].ring){
                player_equip[playerID].ring = "000"
            }else if(itemID == player_equip[playerID].amulet){
                player_equip[playerID].amulet = "000"
            }
        }
        let myinv_info = inv[playerID];
        let my_equip = player_equip[playerID];
        let itemID = args[1];
        if (!itemID || itemID === "000") return message.reply("請輸入目前裝備中的裝備id.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「脫下」.`)
        if (itemID != my_equip.weapon1 &&
            itemID != my_equip.weapon2 &&
            itemID != my_equip.head &&
            itemID != my_equip.body &&
            itemID != my_equip.gloves &&
            itemID != my_equip.leg &&
            itemID != my_equip.boots &&
            itemID != my_equip.ring &&
            itemID != my_equip.amulet) {
            console.log(`使用者(ID: ${playerID})使用「脫下」失敗.`)
            return message.reply("你沒有穿戴此裝備，請再次確認.").then(msg => {
                msg.delete(5000)
            });
        } else {
            if(myinv_info.default_inv.inv_1.itemID == "000"){
                myinv_info.default_inv.inv_1 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_2.itemID == "000"){
                myinv_info.default_inv.inv_2 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_3.itemID == "000"){
                myinv_info.default_inv.inv_3 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_4.itemID == "000"){
                myinv_info.default_inv.inv_4 ={
                    itemID: itemID
                }
            }else if(myinv_info.default_inv.inv_5.itemID == "000"){
                myinv_info.default_inv.inv_5 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_6.itemID == "000"){
                myinv_info.default_inv.inv_6 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_7.itemID == "000"){
                myinv_info.default_inv.inv_7 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_8.itemID == "000"){
                myinv_info.default_inv.inv_8 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_9.itemID == "000"){
                myinv_info.default_inv.inv_9 ={
                    itemID: itemID
                }
                unwear(itemID);
            }else if(myinv_info.default_inv.inv_10.itemID == "000"){
                myinv_info.default_inv.inv_10 ={
                    itemID: itemID
                } 
                unwear(itemID);
            }else{
                return message.reply("背包已滿，請整理後再次執行.").then(msg => {
                    msg.delete(1000)
                });
            }

        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
        fs.writeFile("./character_equip.json", JSON.stringify(player_equip), (err) => {});
        console.log(`使用者(ID: ${playerID})使用「脫下」成功.`)
    }
}