const Discord = require("discord.js");
const userData = require("../players_data.json");
const Player_Material = require("../players_material.json");

//查看背包指令
module.exports = class myinv{
  constructor(){
    this.name = 'mym',
    this.alias = ['角色素材','ma','素材包包','MA'],
    this.usage = '!mym'
  }

  async run(bot, message, args){
    await message.delete();
    let playerID = message.author.id;
    let info = userData[playerID];
    let myMaterial_info = Player_Material[playerID];
    if(!userData[playerID]) return message.reply("角色不存在，請輸入「!角色創建」.").then(msg => {msg.delete(1000)});
    console.log(`使用者(ID: ${playerID})使用「角色素材」`)
    let playerMatEmbed = new Discord.RichEmbed()
    .setAuthor(info.CharacterName)
    .setColor(info.Character_Color)
    .addField("**素材包包**",
    `黏液x` + myMaterial_info.黏液 + `　骨頭x` + myMaterial_info.骨頭
    )

    message.reply(playerMatEmbed).then(msg => {msg.delete(10000)});
  }
}