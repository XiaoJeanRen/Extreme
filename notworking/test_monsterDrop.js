const DropItem = require("../hunt_loots/hunt_loot_Equip.js");
const fs = require("fs");
const all_item = require("../all_item_id_data.json");
const userData = require("../players_data.json");
const inv = require("../players_inventory.json");
const invFull = require("../commandly_Use/Player_inv_isFull.js");
module.exports = class hunt_loot {
    constructor() {
        this.name = 'mdrop',
            this.alias = ['怪物掉落', 'md']
        this.usage = '!mdrop'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });

        if (!args[1]) return message.reply("指令錯誤，指令格式為!md 等級").then(msg => {
            msg.delete(1000)
        });

        let level = args[1];



        let getitem = DropItem.Test_Equip(playerID, level);
        console.log(`使用者(ID: ${playerID})已取得道具「${getitem}」`)

        if (invFull.invfull(inv[playerID], playerID)) {
            message.reply("你的背包已滿，請清理後再進行冒險，以免無法獲得道具.").then(msg => {
                msg.delete(10000)
            });
        }


        if (getitem == "無") {
            message.reply(`很可惜您這次什麼也沒拿到`)
        } else {
            message.reply(`你已獲得裝備獎勵「${getitem}」.`)
        }


        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

        fs.writeFile("./all_item_id_data.json", JSON.stringify(all_item), (err) => {});

    }
}