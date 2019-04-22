const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");
const adv_time = require("../players_adventure_time.json");

let chooseMaps = function(choose_number, playerID, adventure_time){
    adventure_time = adventure_time;
    switch (choose_number) {
        case '001':
            adv_time[playerID].isAdventure = true;
            adv_time[playerID].adventure_time = adventure_time;
            adv_time[playerID].need_time = 60;
            adv_time[playerID].adventure_id = "001";
            adv_time[playerID].adventure_place = "平原";
            userData[playerID].adventure = "正在冒險";
            return "選擇地圖「001 平原」";
        case '002':
            adv_time[playerID].isAdventure = true;
            adv_time[playerID].adventure_time = adventure_time;
            adv_time[playerID].need_time = 300;
            adv_time[playerID].adventure_id = "002";
            adv_time[playerID].adventure_place = "森林";
            userData[playerID].adventure = "正在冒險";
            return "選擇地圖「002 森林」";
        default:
            return "選擇地圖失敗，請重新選擇.";
    }
}

module.exports = class add_Item {
    constructor() {
        this.name = 'adventure',
        this.alias = ['冒險','adv'],
        this.usage = '!adventure'
    }

    async run(bot, message, args) {
        let adventure_time = (message.createdAt / 1000);
        await message.delete();
        let playerID = message.author.id;
        
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        if (!args[1]) return message.reply("冒險請輸入!adv <number>，查看冒險地區請輸入!advs").then(msg => {msg.delete(10000)});
        let choose_number = args[1];
        console.log(`使用者(ID: ${playerID})使用「冒險」`)
        
        if (adv_time[playerID].isAdventure === false) {
            message.reply("冒險成功，" + chooseMaps(choose_number, playerID, adventure_time)).then(msg => {msg.delete(10000)});
        }else{
            message.reply("已在冒險中，輸入!advtime，查看冒險過程").then(msg => {msg.delete(10000)});
        }
    
        /*let get_item_to_player_inv = inv[playerID];
        
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
        }*/

        fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) =>{
        });

        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
        });

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) =>{
        });
        
        fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) =>{
        });
        
        
    }
}