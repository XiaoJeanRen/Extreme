const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const hunt = require("../all_hunts_id_data.json");
// 丟棄裝備指令
let checkHunt = function (myinv_info, itemID) {
    if (itemID == myinv_info.invh_1.itemID) {
        myinv_info.invh_1.itemID = "000";
        delete hunt[itemID];
    } else if (itemID == myinv_info.invh_2.itemID) {
        myinv_info.invh_2.itemID = "000";
        delete hunt[itemID];
    } else if (itemID == myinv_info.invh_3.itemID) {
        myinv_info.invh_3.itemID = "000";
        delete hunt[itemID];
    }
}

module.exports = class droph {
    constructor() {
        this.name = 'droph',
            this.alias = ['放棄狩獵目標','dh'],
            this.usage = '!droph'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        let myinv_info = inv[playerID];
        let itemID = args[1];
        if (!itemID || itemID == "000") return message.reply("請輸入正確的狩獵目標id.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「丟棄」.`)
        if (itemID != myinv_info.invh_1.itemID &&
            itemID != myinv_info.invh_2.itemID &&
            itemID != myinv_info.invh_3.itemID) {
                console.log(`使用者(ID: ${playerID})使用「丟棄」失敗.`)
                return message.reply("你沒有此狩獵目標，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
        }else{
            checkHunt(myinv_info,itemID);
            message.reply(`放棄狩獵目標成功，狩獵目標ID: ${itemID}.`).then(msg => {
                msg.delete(5000)
            });
            fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
            });
            fs.writeFile("./all_hunts_id_data.json", JSON.stringify(hunt), (err) =>{
            });
        }
    }
}