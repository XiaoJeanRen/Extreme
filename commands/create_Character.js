const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../character_equip.json");
const inv = require("../players_inventory.json");
const adv_time = require("../players_adventure_time.json");
const default_inv = require("../default_inventory.json");
const default_skills = require("../default_skills.json");
const dun_fight_Monster = require("../dungeon_players_fight.json");
const player_learn_Skill = require("../skills_players.json");
//創建角色指令
/** 建立全新角色的基礎素質                            建立全新角色的裝備狀況
 * userName                 使用者名稱              weapon1          武器欄位1
 * userId                   使用者Id                weapon2          武器欄位2
 * characterName            角色名稱                arrowbag         箭袋欄位
 * guild                    所屬公會                head             頭盔欄位
 * family                   所屬家族                body             護甲欄位
 * rank                     冒險等級                gloves           手套欄位
 * title                    角色稱號                leg              護腿欄位
 * reputation               角色名聲                boots            鞋子欄位
 * max_Hp                   血量上限                ring             戒指欄位
 * hp                       血量                    amulet           護身符欄位
 * max_Mp                   魔力上限                arrows           箭矢欄位      
 * mp                       魔力
 * max_Ap                   行動點數上限
 * ap                       行動點數
 * max_Weight               重量上限
 * weight                   目前重量
 * str                      力量
 * int                      智慧
 * dex                      敏捷
 * acc                      命中
 * atk                      物理攻擊力
 * def                      物理防禦力
 * matk                     魔法攻擊力
 * mdef                     魔法防禦力
 * map                      所在區域
 * isFight                  是否正在戰鬥
 * fight_Strike_Value       爆擊值
 * fight_Avoid_Value        迴避值
 * fight_Taunt_Value        嘲諷值
 * fight_fire_Damage        火焰傷害
 * fight_cold_Damage        冰冷傷害
 * fight_light_Damage       閃電傷害
 * fight_hit_Damage         打擊傷害
 * fight_cut_Damage         斬擊傷害
 * fight_poke_Damage        刺擊傷害
 * fight_fire_Defence       火焰抗性
 * fight_cold_Defence       冰冷抗性
 * fight_light_Defence      閃定抗性
 * fight_hit_Defence        打擊抗性
 * fight_cut_Defence        斬擊抗性
 * fight_poke_Defence       刺擊抗性
 * fight_Debuff_Fire        燃燒異常
 * fight_Debuff_Cold        冰緩異常
 * fight_Debuff_Light       麻痺異常
 * fight_Debuff_Blood       流血異常
 * fight_Debuff_Banned      繳械異常
 * fight_Debuff_Silence     沉默異常
 * fight_Debuff_Stun        暈眩異常
 * fight_Debuff_Knock       擊飛異常
 * fight_Debuff_Confusion   混亂異常
 * class                    角色職業
 * adventures               冒險確認
 * status                   狀態確認
 * secondclass              第二職業
 * socialstatus             社會地位
 * level                    角色等級
 * exp                      角色經驗
 * money                    角色金錢
 * color                    自訂顏色   
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
          str: 5,
          int: 5,
          dex: 5,
          acc: 5,
          atk: 10,
          def: 10,
          matk: 10,
          mdef: 10,
          map: "無",
          isFight: "無",
          fight_Strike_Value: 0,
          fight_Avoid_Value: 0,
          fight_Taunt_Value: 0,
          fight_fire_Damage: 0,
          fight_cold_Damage: 0,
          fight_light_Damage: 0,
          fight_hit_Damage: 0,
          fight_cut_Damage: 0,
          fight_poke_Damage: 0,
          fight_fire_Defence: 0,
          fight_cold_Defence: 0,
          fight_light_Defence: 0,
          fight_hit_Defence: 0,
          fight_cut_Defence: 0,
          fight_poke_Defence: 0,
          fight_Debuff_Fire: false,
          fight_Debuff_Cold: false,
          fight_Debuff_Light: false,
          fight_Debuff_Blood: false,
          fight_Debuff_Banned: false,
          fight_Debuff_Silence: false,
          fight_Debuff_Stun: false,
          fight_Debuff_Knock: false,
          fight_Debuff_Confusion: false,
          class: "無",
          adventure: "無",
          status: "無",
          secondclass: "無",
          socialstatus: "無",
          level: 1,
          exp: 0,
          money: 0,
          color: "##00cc00",
        };

        equip[message.author.id] = {
          userName: message.author.username,
          userId: message.author.id,
          characterName: characterName,
          weapon1: "000",
          weapon2: "000",
          arrowbag: "000",
          head: "000",
          body: "000",
          gloves: "000",
          leg: "000",
          boots: "000",
          ring: "000",
          amulet: "000",
          arrows: 0
        };

        adv_time[message.author.id] = {
          isAdventure: false,
          adventure_id: "000",
          adventure_place: "無",
          adventure_time: 0,
          need_time: 0
        }

        inv[message.author.id] = default_inv;


         dun_fight_Monster[message.author.id] = {
          monster1: 0,
          monster2: 0,
          monster3: 0
        }

        player_learn_Skill[message.author.id] = default_skills;
  

        fs.writeFile("./skills_players.json", JSON.stringify(player_learn_Skill), (err) => { 
        });
        fs.writeFile("./dungeon_players_fight.json", JSON.stringify(dun_fight_Monster), (err) => { 
        });
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