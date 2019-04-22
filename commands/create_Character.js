const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../character_equip.json");
const inv = require("../players_inventory.json");
const adv_time = require("../players_adventure_time.json");
const default_inv = require("../default_inventory.json");
//創建角色指令
/** 建立全新角色的基礎素質                    建立全新角色的裝備狀況
 * userName         使用者名稱              weapon1          武器欄位1
 * userId           使用者Id                weapon2          武器欄位2
 * characterName    角色名稱                head             頭盔欄位
 * guild            所屬公會                body             護甲欄位
 * rank             冒險等級                gloves           手套欄位
 * title            角色稱號                leg              護腿欄位
 * reputation       角色名聲                boots            鞋子欄位
 * max_Hp           血量上限                ring             戒指欄位
 * hp               血量                    amulet           護身符欄位
 * max_Mp           魔力上限
 * mp               魔力
 * max_Ap           行動點數上限
 * ap               行動點數
 * max_Weight       重量上限
 * weight           目前重量
 * atk              攻擊力
 * def              防禦力
 * class            角色職業
 * level            角色等級
 * exp              角色經驗
 * money            角色金錢
 * color            自訂顏色   
 */
module.exports = class create_Character{
  constructor(){
    this.name = 'create',
    this.alias = ['角色創建','創建角色'],
    this.usage = '!create'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    console.log(`使用者(ID: ${playerID})使用「角色創建」`)
    message.reply("開始建立新角色，請輸入「角色名稱」，此名稱未來可以更改，輸入cancel取消.");
    const filter = m => m.author.id === message.author.id;

    message.channel.awaitMessages(filter, {
      max: 1,
      time: 20000
    }).then(collection =>{
      let characterName = collection.first().content;
      if (!collection.first().content) return message.reply("取消").then(msg => {msg.delete(5000)});
      if(characterName == "cancel") return message.reply("取消").then(msg => {msg.delete(5000)});
      if(!userData[message.author.id]){
        userData[message.author.id] = {
          userName: message.author.username,
          userId: message.author.id,
          characterName: characterName,
          guild: "無",
          family: "無",
          rank: "E",
          title: "無",
          reputation: 0,
          max_Hp: 100,
          hp: 100,
          max_Mp: 100,
          mp: 100,
          max_Ap: 100,
          ap: 100,
          max_Weight: 30.0,
          weight: 0,
          atk: 10,
          def: 10,
          class: "無",
          adventure: "無",
          status: "無",
          secondclass: "無",
          socialstatus: "無",
          level: 1,
          exp: 0,
          money: 0,
          color: "##00cc00"
        };

        equip[message.author.id] = {
          userName: message.author.username,
          userId: message.author.id,
          characterName: characterName,
          weapon1: "000",
          weapon2: "000",
          head: "000",
          body: "000",
          gloves: "000",
          leg: "000",
          boots: "000",
          ring: "000",
          amulet: "000"
        };

        adv_time[message.author.id] = {
          isAdventure: false,
          adventure_id: "000",
          adventure_place: "無",
          adventure_time: 0,
          need_time: 0
        }

        for(let i =1 ; i <= 10 ;i++){
          inv[message.author.id] = {
            default_inv
          }
        }

        
        
        fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) => { 
        });
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) =>{
        });
        fs.writeFile("./character_equip.json", JSON.stringify(equip), (err) =>{
        });
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) =>{
        });
        console.log(`使用者(ID: ${playerID})使用「角色創建」完成.`)
        message.reply(`角色「${characterName}」創建完成`).then(msg => {msg.delete(10000)});
      }else{
        return message.reply("你的角色已存在").then(msg => {msg.delete(5000)});
      }

    }).catch(err =>{
      //console.log(err)
      return message.reply("取消").then(msg => {
        msg.delete(1000)
      });
    });
    

  }

}