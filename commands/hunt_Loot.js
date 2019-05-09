const fs = require("fs");
const userData = require("../players_data.json");
const inv = require("../players_inventory.json");
const invFull = require("../commandly_Use/Player_inv_isFull.js");
const Player_Party = require("../players_party_data.json");
const DropItem = require("../hunt_loots/hunt_loot_Equip.js");
const DropMaterial = require("../hunt_loots/hunt_loot_Material");
const Player_Material = require("../players_material.json");
module.exports = class hunt_loot {
    constructor() {
        this.name = 'loot',
            this.alias = ['怪物掉落', '搜刮']
        this.usage = '!loot'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        let Player_Info = userData[playerID];
        if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });

        if (Player_Info.Character_Hunt != "狩獵搜刮中") return message.reply("你不在狩獵搜刮階段.").then(msg => {
            msg.delete(10000)
        });

        let Party_LeaderID = Player_Info.Character_PartyLeader;

        let Party_Info = Player_Party[Party_LeaderID];

        let Monster_Level = Party_Info.Monster_Actually_Level;
        let Monster_Name = Party_Info.Party_Hunt_Target;

        let getitem = DropItem.Test_Equip(playerID, Monster_Level);
        console.log(`使用者(ID: ${playerID})已取得道具「${getitem}」`)

        let getMaterial = DropMaterial.Test_Material(playerID, Monster_Name);
        
        if (invFull.invfull(inv[playerID], playerID)) {
            message.reply("你的背包已滿，請清理後再進行冒險，以免無法獲得道具.").then(msg => {
                msg.delete(10000)
            });
        }


        if (getitem == "無") {
            message.reply(`很可惜你這次什麼也沒拿到`).then(msg => {
                msg.delete(10000)
            });
        } else {
            message.reply(`你已獲得裝備獎勵「${getitem}」.`).then(msg => {
                msg.delete(10000)
            });
        }

        message.reply(`你取得的素材${getMaterial}`).then(msg => {
            msg.delete(10000)
        });

        Player_Info.Character_Hunt = "無";




        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        

    }
}