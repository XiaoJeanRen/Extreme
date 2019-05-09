const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const player_equip = require("../players_equip.json");
const allitem = require("../all_item_id_data.json");
const all_hunt = require("../all_hunts_id_data.json");
const Player_Material = require("../players_material.json");
const adv_time = require("../players_adventure_time.json");
const player_learn_Skill = require("../players_skills.json");
const players_Original_Hunt_data = require("../players_original_fight_data.json");
// 丟棄裝備指令
let clearAllItem = function (myinv_info) {
    if(myinv_info.inv_1.itemID != "000"){
        delete allitem[myinv_info.inv_1.itemID];
        myinv_info.inv_1.itemID = "000"
    }
    if(myinv_info.inv_2.itemID != "000"){
        delete allitem[myinv_info.inv_2.itemID];
        myinv_info.inv_2.itemID = "000"
    }
    if(myinv_info.inv_3.itemID != "000"){
        delete allitem[myinv_info.inv_3.itemID];
        myinv_info.inv_3.itemID = "000"
    }
    if(myinv_info.inv_4.itemID != "000"){
        delete allitem[myinv_info.inv_4.itemID];
        myinv_info.inv_4.itemID = "000"
    }
    if(myinv_info.inv_5.itemID != "000"){
        delete allitem[myinv_info.inv_5.itemID];
        myinv_info.inv_5.itemID = "000"
    }
    if(myinv_info.inv_6.itemID != "000"){
        delete allitem[myinv_info.inv_6.itemID];
        myinv_info.inv_6.itemID = "000"
    }
    if(myinv_info.inv_7.itemID != "000"){
        delete allitem[myinv_info.inv_7.itemID];
        myinv_info.inv_7.itemID = "000"
    }
    if(myinv_info.inv_8.itemID != "000"){
        delete allitem[myinv_info.inv_8.itemID];
        myinv_info.inv_8.itemID = "000"
    }
    if(myinv_info.inv_9.itemID != "000"){
        delete allitem[myinv_info.inv_9.itemID];
        myinv_info.inv_9.itemID = "000"
    }
    if(myinv_info.inv_10.itemID != "000"){
        delete allitem[myinv_info.inv_10.itemID];
        myinv_info.inv_10.itemID = "000"
    }

    if(myinv_info.invh_1.itemID != "000"){
        delete all_hunt[myinv_info.invh_1.itemID];
        myinv_info.invh_1.itemID = "000"
    }
    if(myinv_info.invh_2.itemID != "000"){
        delete all_hunt[myinv_info.invh_2.itemID];
        myinv_info.invh_2.itemID = "000"
    }
    if(myinv_info.invh_3.itemID != "000"){
        delete all_hunt[myinv_info.invh_3.itemID];
        myinv_info.invh_3.itemID = "000"
    }
    
}

let clearAllEquip = function(playerID){
    if (player_equip[playerID].Weapon1 != "000") {
        delete allitem[player_equip[playerID].Weapon1]
    }
    if (player_equip[playerID].Weapon2 != "000") {
        delete allitem[player_equip[playerID].Weapon2]
    } 
    if (player_equip[playerID].Head != "000") {
        delete allitem[player_equip[playerID].Head]
    }
    if (player_equip[playerID].Body != "000") {
        delete allitem[player_equip[playerID].Body]
    } 
    if (player_equip[playerID].Gloves != "000") {
        delete allitem[player_equip[playerID].Gloves]
    } 
    if (player_equip[playerID].Leg != "000") {
        delete allitem[player_equip[playerID].Leg]
    } 
    if (player_equip[playerID].Boots != "000") {
        delete allitem[player_equip[playerID].Boots]
    } 
    if (player_equip[playerID].Ring != "000") {
        delete allitem[player_equip[playerID].Ring]
    } 
    if (player_equip[playerID].Amulet != "000") {
        delete allitem[player_equip[playerID].Amulet]
    }
}


module.exports = class DeleteCharacter {
    constructor() {
        this.name = 'deleteCharacter',
            this.alias = ['刪除角色','dcc'],
            this.usage = '!deleteCharacter'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });
        let myinv_info = inv[playerID];
        message.reply(`本指令將會清除你此角色的所有資料，你確定要清除嗎?(yes / no)`).then(msg => {
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
                clearAllEquip(playerID);
                delete userData[playerID];
                delete player_equip[playerID];
                delete inv[playerID];
                delete Player_Material[playerID];
                delete adv_time[playerID];
                delete player_learn_Skill[playerID];
                delete players_Original_Hunt_data[playerID];
                console.log(`使用者(ID: ${playerID})使用「清理背包」.`)
                message.reply(`刪除角色成功.`).then(msg => {
                    msg.delete(5000)
                });
                fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
                fs.writeFile("./all_item_id_data.json", JSON.stringify(allitem), (err) => {});
                fs.writeFile("./all_hunts_id_data.json", JSON.stringify(all_hunt), (err) => {});
                fs.writeFile("./players_equip.json", JSON.stringify(player_equip), (err) => {});
                fs.writeFile("./players_material.json", JSON.stringify(Player_Material), (err) => {});
                fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
                fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) => {});
                fs.writeFile("./players_skills.json", JSON.stringify(player_learn_Skill), (err) => {});
                fs.writeFile("./players_original_fight_data.json", JSON.stringify(players_Original_Hunt_data), (err) => {});
            }
        }).catch(err => {
            //console.log(err)
            return message.reply("取消").then(msg => {
                msg.delete(1000)
            });
        })
    }
}