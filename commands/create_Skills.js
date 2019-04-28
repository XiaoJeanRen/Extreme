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
      Skill_ID: skillId,
      Skill_Name: skillName,
      Skill_Type: "火",
      Skill_Attack_Type: "物理",
      Skill_Class: "無",
      Skill_isLearn: "尚未習得",
      Skill_Level: 0,
      Skill_Need_Exp: 1,
      Skill_Need_Level: 1,
      Skill_Target: "無",
      Skill_Require_Skill1: "無",
      Skill_Require_Skill2: "無",
      Skill_Require_Skill3: "無",
      Skill_Require_Skill4: "無",
      Skill_Require_Skill5: "無",
      Skill_Require_Skill6: "無",
      Skill_Decrease_Hp: 0,
      Skill_Decrease_Mp: 0,
      Skill_Decrease_Ap: 0,
      Skill_Increase_Hp: 0,
      Skill_Increase_Mp: 0,
      Skill_Increase_Ap: 0,
      Skill_Add_DMG: 1,
      Skill_Add_DEF: 1,
      Skill_Add_M_DMG: 1,
      Skill_Add_M_DEF: 1,
      Skill_Add_FIRE_DMG: 1,
      Skill_Add_FIRE_DEF: 1,
      Skill_Add_COLD_DMG: 1,
      Skill_Add_COLD_DEF: 1,
      Skill_Add_WOOD_DMG: 1,
      Skill_Add_WOOD_DEF: 1,
      Skill_Add_LIGHT_DMG: 1,
      Skill_Add_LIGHT_DEF: 1,
      Skill_Add_BRIGHT_DMG: 1,
      Skill_Add_BRIGHT_DEF: 1,
      Skill_Add_DARK_DMG: 1,
      Skill_Add_DARK_DEF: 1,
      Skill_Add_HIT_DMG: 1,
      Skill_Add_HIT_DEF: 1,
      Skill_Add_CUT_DMG: 1,
      Skill_Add_CUT_DEF: 1,
      Skill_Add_POKE_DMG: 1,
      Skill_Add_POKE_DEF: 1,
      Skill_Add_POISON_DMG: 1,
      Skill_Add_POISON_DEF: 1,
      Skill_Add_Taunt: 1,
      Skill_Add_Strike: 1,
      Skill_Add_Accurate: 1,
      Skill_Extra_DMG: 1,
      Skill_Extra_DEF: 1,
      Skill_Extra_M_DMG: 1,
      Skill_Extra_M_DEF: 1,
      Skill_Extra_FIRE_DMG: 1,
      Skill_Extra_FIRE_DEF: 1,
      Skill_Extra_COLD_DMG: 1,
      Skill_Extra_COLD_DEF: 1,
      Skill_Extra_WOOD_DMG: 1,
      Skill_Extra_WOOD_DEF: 1,
      Skill_Extra_LIGHT_DMG: 1,
      Skill_Extra_LIGHT_DEF: 1,
      Skill_Extra_BRIGHT_DMG: 1,
      Skill_Extra_BRIGHT_DEF: 1,
      Skill_Extra_DARK_DMG: 1,
      Skill_Extra_DARK_DEF: 1,
      Skill_Extra_HIT_DMG: 1,
      Skill_Extra_HIT_DEF: 1,
      Skill_Extra_CUT_DMG: 1,
      Skill_Extra_CUT_DEF: 1,
      Skill_Extra_POKE_DMG: 1,
      Skill_Extra_POKE_DEF: 1,
      Skill_Extra_POISON_DMG: 1,
      Skill_Extra_POISON_DEF: 1,
      Skill_Extra_HP: 1,
      Skill_Extra_MP: 1,
      Skill_Extra_AP: 1,
      Skill_Extra_Str: 1,
      Skill_Extra_Int: 1,
      Skill_Extra_Dex: 1,
      Skill_Extra_Acc: 1,
      Skill_Extra_Taunt: 1,
      Skill_Extra_Strike: 1,
      Skill_Extra_Accurate: 1,
      Skill_Extra_Material: 1,
      Skill_Extra_Money: 1,
      Skill_Extra_Exp: 1,
      Skill_Extra_Weight: 1,
      Skill_Special1: "無",
      Skill_Special2: "無",
      Skill_Special3: "無",
      Skill_isSpecial1: "無",
      Skill_isSpecial2: "無",
      Skill_isSpecial3: "無",
    }
    console.log(`使用者(ID: ${playerID})使用「創造技能」`)
    message.reply(`技能(id:${skillId}), 技能名稱「${skillName}」創建完成.`).then(msg => {
      msg.delete(5000)
    });
    fs.writeFile("./all_skills_data.json", JSON.stringify(createSkill), (err) => {});
  }
}