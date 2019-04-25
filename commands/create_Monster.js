const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const Createmonster = require("../monster_data.json");
/**
 * monsterId                怪物ID
 * monsterName              怪物名稱
 * monster_Hp               怪物血量
 * monster_Ap               怪物行動點數
 * mosnter_Fire_Damage      怪物火焰傷害
 * mosnter_Cold_Damage      怪物冰冷傷害
 * mosnter_Light_Damage     怪物閃電傷害
 * mosnter_Hit_Damage       怪物打擊傷害
 * mosnter_Cut_Damage       怪物斬擊傷害
 * mosnter_Poke_Damage      怪物刺擊傷害
 * mosnter_Fire_Resistance  怪物火焰抗性
 * mosnter_Cold_Resistance  怪物冰冷抗性
 * mosnter_Light_Resistance 怪物閃電抗性
 * mosnter_Hit_Resistance   怪物打擊抗性
 * mosnter_Cut_Resistance   怪物斬擊抗性
 * mosnter_Poke_Resistance  怪物刺擊抗性
 * mosnter_Avoid_Chance     怪物閃避率
 * mosnter_Debuff_Fire      怪物燃燒異常確認
 * mosnter_Debuff_Cold      怪物冰緩異常確認
 * mosnter_Debuff_Light     怪物麻痺異常確認
 * mosnter_Debuff_Banned    怪物禁言異常確認
 * mosnter_Debuff_Silence   怪物沉默異常確認
 * mosnter_Debuff_Stun      怪物暈眩異常確認
 * mosnter_Debuff_Knock     怪物擊飛異常確認
 * mosnter_Debuff_Confusion 怪物混亂異常確認
 */
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
      monsterId: monsterId,
      monsterName: monsterName,
      monster_Hp: default_point,
      monster_Mp: default_point,
      monster_Ap: default_point,
      monster_level: default_point,
      mosnter_Fire_Damage: default_point,
      mosnter_Cold_Damage: default_point,
      mosnter_Light_Damage: default_point,
      mosnter_Hit_Damage: default_point,
      mosnter_Cut_Damage: default_point,
      mosnter_Poke_Damage: default_point,
      mosnter_Fire_Resistance: default_point,
      mosnter_Cold_Resistance: default_point,
      mosnter_Light_Resistance: default_point,
      mosnter_Hit_Resistance: default_point,
      mosnter_Cut_Resistance: default_point,
      mosnter_Poke_Resistance: default_point,
      mosnter_Avoid_Chance: default_point,
      mosnter_Debuff_Fire: default_false,
      mosnter_Debuff_Cold: default_false,
      mosnter_Debuff_Light: default_false,
      mosnter_Debuff_Banned: default_false,
      mosnter_Debuff_Silence: default_false,
      mosnter_Debuff_Stun: default_false,
      mosnter_Debuff_Knock: default_false,
      mosnter_Debuff_Confusion: default_false,
      mosnter_Maps: default_false,
      mosnter_Element: default_false,

    }
    console.log(`使用者(ID: ${playerID})使用「創造魔物」`)
    message.reply(`怪物(id${monsterId}), 怪物名稱「${monsterName}」創建完成.`).then(msg => {
      msg.delete(5000)
    });
    fs.writeFile("./monster_data.json", JSON.stringify(Createmonster), (err) => {});
  }
}