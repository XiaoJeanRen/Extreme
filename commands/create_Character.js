const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../character_equip.json");
const inv = require("../players_inventory.json");
const default_inv = require("../default_inventory.json");
/** 建立全新角色的基礎素質
 * userName         使用者名稱
 * userId           使用者Id
 * characterName    角色名稱
 * max_Hp           血量上限
 * hp               血量
 * max_Mp           魔力上限
 * mp               魔力
 * max_Ap           行動點數上限
 * ap               行動點數
 * max_Weight       重量上限
 * weight           目前重量
 * atk              攻擊力
 * def              防禦力
 * level            等級
 * exp              經驗   
 */
module.exports = class create_Character{
  constructor(){
    this.name = 'create',
    this.alias = ['角色創建'],
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
      if(characterName === "cancel") return message.reply("取消").then(msg => {msg.delete(1000)});
      if(!userData[message.author.id]){
        userData[message.author.id] = {
          userName: message.author.username,
          userId: message.author.id,
          characterName: characterName,
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

        for(let i =1 ; i <= 10 ;i++){
          inv[message.author.id] = {
            default_inv
          }
        }
        

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
      console.log(err)
      message.reply("取消").then(msg => {
        msg.delete(1000)
      });
    });
    

  }

}