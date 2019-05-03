const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const userData = require("../players_data.json");
const all_item = require("../all_item_id_data.json");
const player_Hunt = require("../players_hunt_monster.json");
const loots_money = require("../hunt_loots/hunt_loot_Money.js");
const loots_exp = require("../hunt_loots/hunt_loot_Exp.js");
const loots_item = require("../hunt_loots/hunt_loot_Item.js");


module.exports = class fight_reward {
    constructor() {
        this.name = 'loot',
            this.alias = ['狩獵獎勵'],
            this.usage = '!loot'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(1000)
        });

        

    }
}