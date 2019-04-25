const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../character_equip.json");
const inv = require("../players_inventory.json");
const adv_time = require("../players_adventure_time.json");
const default_inv = require("../default_inventory.json");
const dun_fight_Monster = require("../dungeon_players_fight.json");
module.exports = class reset {
    constructor() {
        this.name = 'reset',
            this.alias = ['GM重置'],
            this.usage = '!reset'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {msg.delete(1000)});
        let playerID = message.author.id;
        console.log(`使用者(ID: ${playerID})使用「重置」`)
        for(let i = 1; i <=10 ; i++){
            default_inv["inv_" + i] = {
                itemID: "000"
            }
        }
        fs.writeFile("./players_inventory.json", JSON.stringify({}), (err) => {
        });
        fs.writeFile("./dungeon_players_fight.json", JSON.stringify({}), (err) => {
        });
        fs.writeFile("./players_data.json", JSON.stringify({}), (err) => {
        });
        fs.writeFile("./players_adventure_time.json", JSON.stringify({}), (err) => { 
        });
        fs.writeFile("./character_equip.json", JSON.stringify({}), (err) => { 
        });
        fs.writeFile("./default_inventory.json", JSON.stringify(default_inv), (err) => {
        });

        message.reply("GM重置資料庫完成").then(msg => {
            msg.delete(10000)
        });

    }

}