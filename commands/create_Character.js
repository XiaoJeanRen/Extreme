const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const userData = require("../players_data.json");
const equip = require("../character_equip.json");
const inv = require("../players_inventory.json");
const adv_time = require("../players_adventure_time.json");
const default_inv = require("../default_inventory.json");
const all_skill_data = require("../all_skills_data.json");
const player_hunt = require("../players_hunt_monster.json");
const player_learn_Skill = require("../players_skills.json");
//創建角色指令
module.exports = class create_Character {
  constructor() {
    this.name = 'create',
      this.alias = ['角色創建', '創建角色'],
      this.usage = '!create'
  }

  async run(bot, message, args) {
    await message.delete();
    let playerID = message.author.id;
    console.log(`使用者(ID: ${playerID})使用「角色創建」`)
    message.reply("開始建立新角色，請輸入「角色名稱」，此名稱未來可以更改，輸入cancel取消.");
    const filter = m => m.author.id === message.author.id;

    message.channel.awaitMessages(filter, {
      max: 1,
      time: 20000
    }).then(collection => {
      let characterName = collection.first().content;
      if (!collection.first().content) return message.reply("取消").then(msg => {
        msg.delete(5000)
      });
      if (characterName == "cancel") return message.reply("取消").then(msg => {
        msg.delete(5000)
      });
      if (!userData[message.author.id]) {
        userData[message.author.id] = {
          UserName: message.author.username,
          UserID: message.author.id,
          CharacterName: characterName,
          Character_Level: 1,
          Character_Exp: 0,
          Character_Money: 0,
          Character_Guild: "無",
          Character_Family: "無",
          Character_Title: "無",
          Character_Socialstatus: "無",
          Character_Reputation: 0,
          Character_Rank: "E",
          Character_Class: "初心者",
          Character_Adventure: "尚未冒險",
          Character_Hunt: "尚未狩獵",
          Character_isFight: false,
          Character_Party: "無",
          Character_PartyLeader: "無",
          Character_Color: "##00cc00",
          Character_HP: 100,
          Character_MP: 100,
          Character_AP: 100,
          Character_Arrows: 0,
          Character_Weight: 0,
          Character_MaxHP: 100,
          Character_MaxMP: 100,
          Character_MaxAP: 100,
          Character_MaxArrows: 30,
          Character_MaxWeight: 30,
          Character_Extra_Material: 0,
          Character_Extra_Money: 0,
          Character_Extra_Exp: 0,
          Character_Extra_Escape: 0,
          Character_Str: 3,
          Character_Int: 3,
          Character_Dex: 3,
          Character_Acc: 1,
          Character_DMG: 1,
          Character_DEF: 1,
          Character_M_DMG: 0,
          Character_M_Def: 1,
          Character_Strike: 1,
          Character_Accurate: 1,
          Character_Taunt: 0,
          Character_HIT_DMG: 0,
          Character_HIT_DEF: 0,
          Character_CUT_DMG: 0,
          Character_CUT_DEF: 0,
          Character_POKE_DMG: 0,
          Character_POKE_DEF: 0,
          Character_COLD_DMG: 0,
          Character_COLD_DEF: 0,
          Character_FIRE_DMG: 0,
          Character_FIRE_DEF: 0,
          Character_WOOD_DMG: 0,
          Character_WOOD_DEF: 0,
          Character_LIGHT_DMG: 0,
          Character_LIGHT_DEF: 0,
          Character_BRIGHT_DMG: 0,
          Character_BRIGHT_DEF: 0,
          Character_DARK_DMG: 0,
          Character_DARK_DEF: 0,
          Character_POISON_DMG: 0,
          Character_POISON_DEF: 0,
          Character_Status1: "無",
          Character_Status2: "無",
          Character_Status3: "無",
          Character_Status4: "無",
          Character_Status5: "無",
          Character_Status6: "無"
        };

        equip[message.author.id] = {
          UserName: message.author.username,
          UserID: message.author.id,
          CharacterName: characterName,
          Weapon1: "000",
          Weapon2: "000",
          Arrowbag: "000",
          Head: "000",
          Body: "000",
          Gloves: "000",
          Leg: "000",
          Boots: "000",
          Ring: "000",
          Amulet: "000",
          Arrows: 0
        };

        adv_time[message.author.id] = {
          isAdventure: false,
          adventure_id: "000",
          adventure_place: "無",
          adventure_time: 0,
          need_time: 0
        }

        inv[message.author.id] = default_inv;


        player_hunt[message.author.id] = {
          Monster_Name: "無",
          Monster_ID: "無",
          Monster_Number: 0,
          Monster_Time: 0,
          Monster_Need_Time: 0,
          Fight_place: "無",
          isFightMonster: false,
          FightMonster: "尚未狩獵",
          FightMonster_TotalHP: 0,
          FightMonster_FightHP: 0
        }

        player_learn_Skill[message.author.id] = all_skill_data;


        fs.writeFile("./players_hunt_monster.json", JSON.stringify(player_hunt), (err) => {});
        fs.writeFile("./players_skills.json", JSON.stringify(player_learn_Skill), (err) => {});
        fs.writeFile("./players_adventure_time.json", JSON.stringify(adv_time), (err) => {});
        fs.writeFile("./players_data.json", JSON.stringify(userData), (err) => {});
        fs.writeFile("./character_equip.json", JSON.stringify(equip), (err) => {});
        fs.writeFile("./players_inventory.json", JSON.stringify(inv), (err) => {});
        console.log(`使用者(ID: ${playerID})使用「角色創建」完成.`)
        message.reply(`角色「${characterName}」創建完成`).then(msg => {
          msg.delete(10000)
        });
      } else {
        return message.reply("你的角色已存在").then(msg => {
          msg.delete(5000)
        });
      }

    }).catch(err => {
      //console.log(err)
      return message.reply("取消").then(msg => {
        msg.delete(1000)
      });
    });


  }

}