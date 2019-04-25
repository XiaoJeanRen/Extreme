const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const player_equip = require("../character_equip.json");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");
// 穿戴裝備指令


let wear = function (itemID,playerID){
    userData[playerID].max_Hp += equip[itemID].add_max_Hp;                              //裝備增加HP
    userData[playerID].max_Mp += equip[itemID].add_max_Mp;                              //裝備增加MP
    userData[playerID].max_Ap += equip[itemID].add_max_Ap;                              //裝備增加AP
    userData[playerID].max_Weight += equip[itemID].add_max_Weight;                      //裝備增加負重
    userData[playerID].str += equip[itemID].add_Str;                                    //裝備增加力量
    userData[playerID].int += equip[itemID].add_Int;                                    //裝備增加智慧
    userData[playerID].dex += equip[itemID].add_Dex;                                    //裝備增加敏捷
    userData[playerID].acc += equip[itemID].add_Acc;                                    //裝備增加命中
    userData[playerID].atk += equip[itemID].add_atk;                                    //裝備增加攻擊
    userData[playerID].def += equip[itemID].add_def;                                    //裝備增加防禦
    userData[playerID].matk += equip[itemID].add_Matk;                                    //裝備增加攻擊
    userData[playerID].mdef += equip[itemID].add_Mdef;                                    //裝備增加防禦
    userData[playerID].atk += equip[itemID].strengthen;                                 //裝備增加強化指數
    userData[playerID].weight += equip[itemID].needWeight;                              //裝備需求負重
    userData[playerID].fight_fire_Damage += equip[itemID].add_fire_atk;                 //裝備增加火焰傷害
    userData[playerID].fight_cold_Damage += equip[itemID].add_cold_atk;                 //裝備增加冰冷傷害
    userData[playerID].fight_light_Damage += equip[itemID].add_light_atk;               //裝備增加閃電傷害
    userData[playerID].fight_hit_Damage += equip[itemID].fight_hit_Damage;              //裝備增加打擊傷害
    userData[playerID].fight_cut_Damage += equip[itemID].fight_cut_Damage;              //裝備增加斬擊傷害
    userData[playerID].fight_poke_Damage += equip[itemID].fight_poke_Damage;            //裝備增加刺擊傷害
    userData[playerID].fight_fire_Defence += equip[itemID].add_fire_def;                 //裝備增加火焰防禦
    userData[playerID].fight_cold_Defence += equip[itemID].add_cold_def;                 //裝備增加冰冷防禦
    userData[playerID].fight_light_Defence += equip[itemID].add_light_def;               //裝備增加閃電防禦
    userData[playerID].fight_hit_Defence += equip[itemID].fight_hit_Defence;              //裝備增加打擊防禦
    userData[playerID].fight_cut_Defence += equip[itemID].fight_cut_Defence;              //裝備增加斬擊防禦
    userData[playerID].fight_poke_Defence += equip[itemID].fight_poke_Defence;            //裝備增加刺擊防禦
    
}

module.exports = class wear_equip {
    constructor() {
        this.name = 'wear',
            this.alias = ['穿戴'],
            this.usage = '!wear'
    }

    async run(bot, message, args) {
        await message.delete();
        let playerID = message.author.id;
        if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
        
        let myinv_info = inv[playerID];
        let my_equip = player_equip[playerID];
        let itemID = args[1];
        if (!itemID) return message.reply("請輸入背包內的裝備id.").then(msg => {
            msg.delete(1000)
        });
        console.log(`使用者(ID: ${playerID})使用「穿戴」.`)
        if (itemID != myinv_info.default_inv.inv_1.itemID &&
            itemID != myinv_info.default_inv.inv_2.itemID &&
            itemID != myinv_info.default_inv.inv_3.itemID &&
            itemID != myinv_info.default_inv.inv_4.itemID &&
            itemID != myinv_info.default_inv.inv_5.itemID &&
            itemID != myinv_info.default_inv.inv_6.itemID &&
            itemID != myinv_info.default_inv.inv_7.itemID &&
            itemID != myinv_info.default_inv.inv_8.itemID &&
            itemID != myinv_info.default_inv.inv_9.itemID &&
            itemID != myinv_info.default_inv.inv_10.itemID) {
                console.log(`使用者(ID: ${playerID})使用「穿戴」失敗.`)
                return message.reply("你沒有此裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
        }else{
            if(equip[itemID].item_Type != "裝備"){
                return message.reply("此物品不是裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
            }else{
                if(equip[itemID].equip_Type == "武器" || equip[itemID].equip_Type == "盾牌"){
                    if(my_equip.weapon1 == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.weapon1 = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("武器或盾牌裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }else if(my_equip.weapon2 == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.weapon2 = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("武器或盾牌裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }else{
                        return message.reply("你的武器欄已滿，請脫下武器或盾牌");
                    }
                }
                if(equip[itemID].equip_Type == "頭盔"){
                    if(my_equip.head == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.head = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("頭盔裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].equip_Type == "護甲"){
                    if(my_equip.body == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.body = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("護甲裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].equip_Type == "手套"){
                    if(my_equip.gloves == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.gloves = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("手套裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].equip_Type == "護腿"){
                    if(my_equip.leg == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.leg = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("護腿裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].equip_Type == "鞋子"){
                    if(my_equip.boots == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.boots = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("鞋子裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].equip_Type == "戒指"){
                    if(my_equip.ring == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.ring = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("戒指裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].equip_Type == "護身符"){
                    if(my_equip.amulet == "000"){
                        if(itemID == myinv_info.default_inv.inv_1.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_2.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_3.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_4.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_5.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_6.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_7.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_8.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_9.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.default_inv.inv_10.itemID){
                            my_equip.amulet = itemID;
                            myinv_info.default_inv.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("護身符裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
            }
        }
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) =>{
        });
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
        });
        fs.writeFile("./character_equip.json", JSON.stringify(player_equip), (err) =>{
        });
        console.log(`使用者(ID: ${playerID})使用「穿戴」成功.`)
    }
}