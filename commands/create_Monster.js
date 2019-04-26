const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const Createmonster = require("../all_monster_data.json");

module.exports = class create_monster {
  constructor() {
    this.name = 'createM',
      this.alias = ['創造魔物'],
      this.usage = '!createM'
  }

  async run(bot, message, args) {
    await message.delete();
    if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
      msg.delete(1000)
    });

    let default_false = false;
    let default_point = 1;
    if (!args[1] || !args[2]) return message.reply("指令錯誤，指令格式微!createM 怪物ID 怪物名稱").then(msg => {
      msg.delete(1000)
    });
    let playerID = message.author.id;
    let monsterId = args[1];
    let monsterName = args[2]
    Createmonster[monsterId] = {
      Monster_ID: monsterId,
      Monster_Name: monsterName,
      Monster_Type: "無",
      Monster_Attributes: "無",
      Monster_Info: "無",
      Monster_Map: "無",
      Monster_Level: default_point,
      Monster_HP: default_point,
      Monster_MP: default_point,
      Monster_AP: default_point,
      Mosnter_DMG: default_point,
      Mosnter_DEF: default_point,
      Mosnter_M_DMG: default_point,
      Mosnter_M_DEF: default_point,
      Mosnter_FIRE_DMG: default_point,
      Mosnter_FIRE_DEF: default_point,
      Mosnter_COLD_DMG: default_point,
      Mosnter_COLD_DEF: default_point,
      Mosnter_WOOD_DMG: default_point,
      Mosnter_WOOD_DEF: default_point,
      Mosnter_LIGHT_DMG: default_point,
      Mosnter_LIGHT_DEF: default_point,
      Mosnter_BIRGHT_DMG: default_point,
      Mosnter_BRIGHT_DEF: default_point,
      Mosnter_DARK_DMG: default_point,
      Mosnter_DARK_DEF: default_point,
      Mosnter_HIT_DMG: default_point,
      Mosnter_HIT_DEF: default_point,
      Mosnter_CUT_DMG: default_point,
      Mosnter_CUT_DEF: default_point,
      Mosnter_POKE_DMG: default_point,
      Mosnter_POKE_DEF: default_point,
      Mosnter_Extra_Accurate: default_point,
      Mosnter_Extra_Strike: default_point,
      Monster_Drop_Material1: "無",
      Monster_Drop_Material2: "無",
      Monster_Drop_Material3: "無",
      Monster_Drop_Material4: "無",
      Monster_Drop_Material5: "無",
      Monster_Drop_Material6: "無",
      Monster_Drop_Equip1:"無",
      Monster_Drop_Equip2:"無",
      Monster_Drop_Equip3:"無",
      Monster_Drop_Equip4:"無",
      Monster_Drop_Equip5:"無",
      Monster_Drop_Equip6:"無",
      Monster_Status1: "無",
      Monster_Status2: "無",
      Monster_Status3: "無",
      Monster_Status4: "無",
      Monster_Status5: "無",
      Monster_Status6: "無",

    }
    console.log(`使用者(ID: ${playerID})使用「創造魔物」`)
    message.reply(`怪物(id${monsterId}), 怪物名稱「${monsterName}」創建完成.`).then(msg => {
      msg.delete(5000)
    });
    fs.writeFile("./monster_data.json", JSON.stringify(Createmonster), (err) => {});
  }
}