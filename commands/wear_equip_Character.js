const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const inv = require("../players_inventory.json");
const player_equip = require("../character_equip.json");
const userData = require("../players_data.json");
const equip = require("../all_item_id_data.json");
// 穿戴裝備指令


let wear = function (itemID,playerID){
    userData[playerID].Character_MaxHP += equip[itemID].Equip_Add_MaxHP;
    userData[playerID].Character_MaxMP += equip[itemID].Equip_Add_MaxMP;
    userData[playerID].Character_MaxAP += equip[itemID].Equip_Add_MaxAP;
    userData[playerID].Character_MaxWeight += equip[itemID].Equip_Add_MaxWeight;

    userData[playerID].Character_Extra_Escape += equip[itemID].Equip_Extra_Escape;
    userData[playerID].Character_Extra_Material += equip[itemID].Equip_Extra_Material;                              //裝備增加HP
    userData[playerID].Character_Extra_Money += equip[itemID].Equip_Extra_Money;                              //裝備增加MP
    userData[playerID].Character_Extra_Exp += equip[itemID].Equip_Extra_Exp;

    userData[playerID].Character_Str += equip[itemID].Equip_Add_Str;
    userData[playerID].Character_Int += equip[itemID].Equip_Add_Int;
    userData[playerID].Character_Dex += equip[itemID].Equip_Add_Dex;
    userData[playerID].Character_Acc += equip[itemID].Equip_Add_Acc;

    userData[playerID].Character_DMG += equip[itemID].Equip_Add_DMG;
    userData[playerID].Character_DEF += equip[itemID].Equip_Add_DEF;

    userData[playerID].Character_Strike += equip[itemID].Equip_Add_Strike;
    userData[playerID].Character_Accurate += equip[itemID].Equip_Add_Accurate;
    userData[playerID].Character_Taunt += equip[itemID].Equip_Add_Taunt;

    userData[playerID].Character_M_DMG += equip[itemID].Equip_Add_M_DMG;
    userData[playerID].Character_M_Def += equip[itemID].Equip_Add_M_Def;
    
    userData[playerID].Character_Weight += equip[itemID].Equip_Need_Weight;

    //火
    userData[playerID].Character_FIRE_DMG += equip[itemID].Equip_Add_FIRE_DMG;
    userData[playerID].Character_FIRE_DEF += equip[itemID].Equip_Add_FIRE_DEF;

    //水
    userData[playerID].Character_COLD_DMG += equip[itemID].Equip_Add_COLD_DMG;
    userData[playerID].Character_COLD_DEF += equip[itemID].Equip_Add_COLD_DEF;

    //木
    userData[playerID].Character_WOOD_DMG += equip[itemID].Equip_Add_WOOD_DMG;
    userData[playerID].Character_WOOD_DEF += equip[itemID].Equip_Add_WOOD_DEF;

    //閃電
    userData[playerID].Character_LIGHT_DMG += equip[itemID].Equip_Add_LIGHT_DMG;
    userData[playerID].Character_LIGHT_DEF += equip[itemID].Equip_Add_LIGHT_DEF;
    
    //光明
    userData[playerID].Character_BRIGHT_DMG += equip[itemID].Equip_Add_BRIGHT_DMG;
    userData[playerID].Character_BRIGHT_DEF += equip[itemID].Equip_Add_BRIGHT_DEF;

    //黑暗
    userData[playerID].Character_DARK_DMG += equip[itemID].Equip_Add_DARK_DMG;
    userData[playerID].Character_DARK_DEF += equip[itemID].Equip_Add_DARK_DEF;

    //毒
    userData[playerID].Character_POISON_DMG += equip[itemID].Equip_Add_POISON_DMG;
    userData[playerID].Character_POISON_DEF += equip[itemID].Equip_Add_POISON_DEF;

    //打
    userData[playerID].Character_HIT_DMG += equip[itemID].Equip_Add_HIT_DMG;
    userData[playerID].Character_HIT_DEF += equip[itemID].Equip_Add_HIT_DEF;

    //斬
    userData[playerID].Character_CUT_DMG += equip[itemID].Equip_Add_CUT_DMG;
    userData[playerID].Character_CUT_DEF += equip[itemID].Equip_Add_CUT_DEF;

    //刺
    userData[playerID].Character_POKE_DMG += equip[itemID].Equip_Add_POKE_DMG;
    userData[playerID].Character_POKE_DEF += equip[itemID].Equip_Add_POKE_DEF;
    
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
        console.log(equip[itemID].Item_Type)
        console.log(`使用者(ID: ${playerID})使用「穿戴」.`)
        if (itemID != myinv_info.inv_1.itemID &&
            itemID != myinv_info.inv_2.itemID &&
            itemID != myinv_info.inv_3.itemID &&
            itemID != myinv_info.inv_4.itemID &&
            itemID != myinv_info.inv_5.itemID &&
            itemID != myinv_info.inv_6.itemID &&
            itemID != myinv_info.inv_7.itemID &&
            itemID != myinv_info.inv_8.itemID &&
            itemID != myinv_info.inv_9.itemID &&
            itemID != myinv_info.inv_10.itemID) {
                console.log(`使用者(ID: ${playerID})使用「穿戴」失敗.`)
                return message.reply("你沒有此裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
        }else{
            if(equip[itemID].Item_Type != "裝備"){
                return message.reply("此物品不是裝備，請再次確認.").then(msg => {
                    msg.delete(5000)
                });
            }else{
                if(equip[itemID].Equip_Type == "武器" || equip[itemID].Equip_Type == "盾牌"){
                    if(my_equip.Weapon1 == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Weapon1 = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("武器或盾牌裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }else if(my_equip.Weapon2 == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Weapon2 = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("武器或盾牌裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }else{
                        return message.reply("你的武器欄已滿，請脫下武器或盾牌");
                    }
                }
                if(equip[itemID].Equip_Type == "頭盔"){
                    if(my_equip.Head == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Head = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("頭盔裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "護甲"){
                    if(my_equip.Body == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Body = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("護甲裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "手套"){
                    if(my_equip.Gloves == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Gloves = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("手套裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "護腿"){
                    if(my_equip.Leg == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Leg = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("護腿裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "鞋子"){
                    if(my_equip.Boots == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Boots = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("鞋子裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "戒指"){
                    if(my_equip.Ring == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Ring = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("戒指裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "護身符"){
                    if(my_equip.Amulet == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Amulet = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("護身符裝備完成").then(msg => {
                            msg.delete(1000)
                        });
                    }
                }
                if(equip[itemID].Equip_Type == "箭袋"){
                    if(my_equip.Arrowbag == "000"){
                        if(itemID == myinv_info.inv_1.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_1.itemID = "000";
                        }else if(itemID == myinv_info.inv_2.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_2.itemID = "000";
                        }else if(itemID == myinv_info.inv_3.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_3.itemID = "000";
                        }else if(itemID == myinv_info.inv_4.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_4.itemID = "000";
                        }else if(itemID == myinv_info.inv_5.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_5.itemID = "000";
                        }else if(itemID == myinv_info.inv_6.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_6.itemID = "000";
                        }else if(itemID == myinv_info.inv_7.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_7.itemID = "000";
                        }else if(itemID == myinv_info.inv_8.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_8.itemID = "000";
                        }else if(itemID == myinv_info.inv_9.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_9.itemID = "000";
                        }else if(itemID == myinv_info.inv_10.itemID){
                            my_equip.Arrowbag = itemID;
                            myinv_info.inv_10.itemID = "000";
                        }
                        wear(itemID,playerID);
                        message.reply("箭袋裝備完成").then(msg => {
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