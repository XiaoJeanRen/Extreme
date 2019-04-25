const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const createSkill = require("../all_skills_data.json");

module.exports = class create_skill {
  constructor() {
    this.name = 'createS',
      this.alias = ['創造技能','cs'],
      this.usage = '!createS'
  }

  async run(bot, message, args) {
    await message.delete();
    if (message.author.id != config.gm) return message.reply("權限不足").then(msg => {
      msg.delete(1000)
    });

    if (!args[1] || !args[2]) return message.reply("指令錯誤，指令格式微!createS 技能ID 技能名稱").then(msg => {
      msg.delete(1000)
    });
    let playerID = message.author.id;
    let skillId = args[1];
    let skillName = args[2]
    createSkill[skillId] = {
      skillID: skillId,
      skillName: skillName,
      skillType: "無",
      skillClass: "無",
      isskillGet: "尚未習得",
      skillLevel: 0,
      skillNeedExp: 1,
      skillNeedLevel: 1,
      skill_require_skill_1: "無",
      skill_require_skill_2: "無",
      skill_require_skill_3: "無",
      skill_require_skill_4: "無",
      skill_require_skill_5: "無",
      skillUseAp: 5,
      skillTarget: "無",
      skill_fire_damage: 1,
      skill_fire_defence: 1,
      skill_cold_damage: 1,
      skill_cold_defence: 1,
      skill_light_damage: 1,
      skill_light_defence: 1,
      skill_hit_damage: 1,
      skill_hit_defence: 1,
      skill_cut_damage: 1,
      skill_cut_defence: 1,
      skill_poke_damage: 1,
      skill_poke_defence: 1,
      add_max_Hp: 0,
      add_max_Mp: 0,
      add_max_Ap: 0,
      add_Hp: 0,
      add_Mp: 0,
      add_Ap: 0,
      add_Str: 0,
      add_Int: 0,
      add_Dex: 0,
      add_Acc: 0,
      add_max_Weight: 0,
      add_atk: 0,
      add_def: 0,
      add_Matk: 0,
      add_Mdef: 0,
      add_Taunt: 0,
      add_Strike: 0,
      add_wepon_atk: 0,
      add_equip_def: 0,
      add_wepon_Weight: 0,
      add_equip_Weight: 0,
      extra_exp: 0,
      extra_money: 0,
      extra_item: 0,
      extra_arrows: 0,
      extra_atk: 0,
      extra_matk: 0,
      extra_def: 0,
      extra_mdef: 0,
      extra_debuff: "無",
      extra_buff: "無",
      extra_fire_damage: 0,
      extra_cold_damage: 0,
      extra_light_damage: 0,
      extra_fire_defence: 0,
      extra_cold_defence: 0,
      extra_light_defence: 0,
      Special_power_1: "無",
      Special_power_2: "無",
      Special_power_3: "無",
      is_Special_power_1: "無",
      is_Special_power_2: "無",
      is_Special_power_3: "無",
    }
    console.log(`使用者(ID: ${playerID})使用「創造技能」`)
    message.reply(`技能(id:${skillId}), 技能名稱「${skillName}」創建完成.`).then(msg => {
      msg.delete(5000)
    });
    fs.writeFile("./all_skills_data.json", JSON.stringify(createSkill), (err) => {});
  }
}