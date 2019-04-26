const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const player_fightNow_Monster = require("../dungeon_players_fight.json");
const fightMonster = require("../monster_data.json");
const dun_fight_Monster = require("../dungeon_players_fight.json");
//查看角色狀態指令

module.exports = class fight_monster {
    constructor() {
        this.name = 'ss',
            this.alias = ['模擬'],
            this.usage = '!ss'
    }

    async run(bot, message, args) {
        let playerID = message.author.id;
        let player_info = userData[playerID];
        let player_battle = player_fightNow_Monster[playerID];

        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });
        let attackType = args[1];
        if (!args[1]) return message.reply("指令錯誤").then(msg => {
            msg.delete(1000)
        });
        let skillid = args[2];


    }
}