const fs = require("fs");
const userData = require("../players_data.json");
const player_material = require("../players_material.json");
const material = require("../hunt_loots/hunt_loot_Material");
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

        let MonsterName = args[1];



        material.Test_Material(playerID, MonsterName);
        //console.log(`使用者(ID: ${playerID})已取得道具「${getitem}」`)




        /*if (getitem == "無") {
            message.reply(`很可惜您這次什麼也沒拿到`)
        } else {
            message.reply(`你已獲得裝備獎勵「${getitem}」.`)
        }




        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});*/



    }
}