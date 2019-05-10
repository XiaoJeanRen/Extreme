const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
//創建角色指令
module.exports = class create_Character {
    constructor() {
        this.name = 'GMS',
            this.alias = ['gms'],
            this.usage = '!GMS'
    }

    async run(bot, message, args) {
        await message.delete();
        if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
            msg.delete(1000)
        });

        let GM = userData[message.author.id];
        GM.Character_HP = 10000;
        GM.Character_MP = 10000;
        GM.Character_AP = 10000;
        GM.Character_Exp = 100000;
        GM.Character_Money = 10000;
        GM.Character_DEF = 10000;
        GM.Character_DMG = 10000;
        GM.Character_Class = "戰士";

        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});

        console.log(`使用者(ID: ${GM})使用「GM設定」完成.`)
        message.reply(`GM設定完成`).then(msg => {
            msg.delete(10000)
        });



    }

}
