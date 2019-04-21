const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const all_item = require("../all_item_id_data.json");

module.exports = class add_Item {
    constructor() {
        this.name = 'GM_add_item',
            this.alias = ['物品給予'],
            this.usage = '!GM_add_item'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「物品給予」`)
        let addPlayerID = message.mentions.members.first().id;
        console.log(addPlayerID)
        let itemID = args[2];
        if (!itemID || !addPlayerID) return message.reply("GM您好\n物品給予格式：「!物品給予 <@使用者> <itemID>」");
        let add_inv = inv[addPlayerID];
        console.log(itemID)
        

        if(add_inv.default_inv.inv_1.itemID == "000"){
            add_inv.default_inv.inv_1 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_2.itemID == "000"){
            add_inv.default_inv.inv_2 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_3.itemID == "000"){
            add_inv.default_inv.inv_3 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_4.itemID == "000"){
            add_inv.default_inv.inv_4 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_5.itemID == "000"){
            add_inv.default_inv.inv_5 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_6.itemID == "000"){
            add_inv.default_inv.inv_6 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_7.itemID == "000"){
            add_inv.default_inv.inv_7 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_8.itemID == "000"){
            add_inv.default_inv.inv_8 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_9.itemID == "000"){
            add_inv.default_inv.inv_9 ={
                itemID: itemID
            }
        }else if(add_inv.default_inv.inv_10.itemID == "000"){
            add_inv.default_inv.inv_10 ={
                itemID: itemID
            } 
        }else{
            return message.reply("此玩家背包已滿.").then(msg => {
                msg.delete(1000)
            });
        }
        message.reply("給予裝備完成.").then(msg => {
            msg.delete(1000)
        });   
        

        
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});

    }

}