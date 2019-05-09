const Discord = require("discord.js");
const userData = require("../players_data.json");
const Player_Material = require("../players_material.json");

//查看背包指令
module.exports = class myinv {
  constructor() {
    this.name = 'mym',
      this.alias = ['角色素材', 'ma', '素材包包', 'MA'],
      this.usage = '!mym'
  }

  async run(bot, message, args) {
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    let myMaterial_info = Player_Material[playerID];
    if (!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {
      msg.delete(1000)
    });
    console.log(`使用者(ID: ${playerID})使用「角色素材」`)
    let playerMatEmbed = new Discord.RichEmbed()
      .setAuthor(info.CharacterName)
      .setColor(info.Character_Color)
      .addField("**素材包包**",
        `黏液x` + myMaterial_info.黏液 + `　骨頭x` + myMaterial_info.骨頭 +
        `　箭頭x` + myMaterial_info.箭頭 + `　羽毛x` + myMaterial_info.羽毛 +
        `　破損的劍x` + myMaterial_info.破損的劍 + `　魔法粉末x` + myMaterial_info.魔法粉末 + "\n" +
        `蜘蛛腿x` + myMaterial_info.蜘蛛腿 + `　蜘蛛絲x` + myMaterial_info.蜘蛛絲 +
        `　蜘蛛眼x` + myMaterial_info.蜘蛛眼 + `　哥布林的耳朵x` + myMaterial_info.哥布林的耳朵 + "\n" +
        `破碎的布料x` + myMaterial_info.破碎的布料 + `　破碎的皮革x` + myMaterial_info.破碎的皮革 +
        `　無法食用的牛肉x` + myMaterial_info.無法食用的牛肉 + `　無法食用的豬肉x` + myMaterial_info.無法食用的豬肉 + "\n" +
        `無法食用的雞肉x` + myMaterial_info.無法食用的雞肉 + `　邪惡的氣息x` + myMaterial_info.邪惡的氣息 +
        `　精良的皮革x` + myMaterial_info.精良的皮革 + `　狼肉x` + myMaterial_info.狼肉 + "\n"
      )

    message.reply(playerMatEmbed).then(msg => {
      msg.delete(10000)
    });
  }
}