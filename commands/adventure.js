const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const all_item = require("../all_item_id_data.json");

module.exports = class add_Item {
    constructor() {
        this.name = 'adventure',
            this.alias = ['冒險','adv'],
            this.usage = '!adventure'
    }

    async run(bot, message, args) {
        await message.delete();
        message.reply("冒險完成，已獲得道具.").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        let get_item_to_player_inv = inv[playerID];
        
        all_item[all_item["總資料"].number] = {
            item_Id: all_item["總資料"].number,
            item_Type: "裝備",
            equip_Name: "新手木劍",
            equip_Type: "武器",
            add_max_Hp: 0,
            add_max_Mp: 0,
            add_max_Ap: 0,
            add_max_Weight: 0,
            add_atk: 10,
            add_def: 0,
            needLevel: 1,
            needClass: "無",
            needWeight: 1,
            special: "無",
            itemInfo: "無",
            itemValue: 0,
            itemSpecialId: 1
        }

        let dropitem_id = `${all_item["總資料"].number}`;

        if(get_item_to_player_inv.default_inv.inv_1.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_1 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_2.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_2 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_3.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_3 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_4.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_4 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_5.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_5 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_6.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_6 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_7.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_7 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_8.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_8 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_9.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_9 ={
                itemID: dropitem_id
            }
        }else if(get_item_to_player_inv.default_inv.inv_10.itemID == "000"){
            get_item_to_player_inv.default_inv.inv_10 ={
                itemID: dropitem_id
            } 
        }else{
            return message.reply("此玩家背包已滿.").then(msg => {
                msg.delete(1000)
            });
        }
        message.reply("裝備給予完成.").then(msg => {
            msg.delete(1000)
        });

        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
        });

        all_item["總資料"].number += 1;
        fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) =>{
        });
        
        
    }
}