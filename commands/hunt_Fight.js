const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json"); 
const equip = require("../all_item_id_data.json"); //玩家裝備
const PartyData = require("../players_party_data.json");
const isDead_Check = require("../commandly_Use/Player_isDead");
const Weapon_Type_Check = require("../command_Fight/check_Weapon");
//查看角色狀態指令

module.exports = class hunt_fight {
    constructor() {
        this.name = 'huntfight',
            this.alias = ['hf', 'huntFight', '狩獵戰鬥', 'HF'],
            this.usage = '!huntfight'
    }

    async run(bot, message, args) {

        let playerID = message.author.id;
        //console.log(huntID)
        let Player_info = userData[playerID];
        if (!Player_info) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
            msg.delete(10000)
        });
        if (Player_info.Character_Hunt != "正在共同狩獵") return message.reply("你尚未開始狩獵.").then(msg => {
            msg.delete(10000)
        });
        if (Player_info.Character_Party == "無") return message.reply("你尚未擁有組隊.").then(msg => {
            msg.delete(10000)
        });
        if (Player_info.Character_isAlive != "還活著") return message.reply("你已經死亡，請輸入!revive").then(msg => {
            msg.delete(10000)
        });
        
        if (!args[1]) return message.reply("指令錯誤，請輸入!hf (普攻/技能/狀態/逃跑)").then(msg => {
            msg.delete(1000)
        });
        let Fight_Type = args[1];

        let Party_Leader = Player_info.Character_PartyLeader; //玩家組隊隊長

        let Hunt_Target = PartyData[Party_Leader].Party_Hunt_Target; //狩獵對象

        if(isDead_Check.isDead(Player_info)){ //檢查玩家是否死亡
            return message.reply("角色已死亡.").then(msg => {
                msg.delete(1000)
            });
        }

        let Weapon_Type = Weapon_Type_Check.WeaponCheck(Player_info, Monster_info);

        switch(Fight_Type){
            case '普攻':
            case '普通攻擊':

        }

    }
}