const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const dun_fight_Monster = require("../dungeon_players_fight.json");
const fightMonster = require("../monster_data.json");
//查看角色狀態指令

module.exports = class fight_monster {
    constructor() {
        this.name = 'dun',
            this.alias = ['地下城探險', 'dungeon'],
            this.usage = '!dun'
    }

    async run(bot, message, args) {

        let playerID = message.author.id;
        let player_info = userData[playerID];
        let pick_Monster = args[1];
        if (!args[1]) return message.reply("ERROR");
        let monster_info = dun_fight_Monster[playerID];
        monster_info.player_original_status = userData[playerID];
        monster_info.monster1 = fightMonster[pick_Monster];
        fs.writeFile("./dungeon_players_fight.json", JSON.stringify(dun_fight_Monster), (err) => {});
        message.reply("戰鬥開始");
    }
}