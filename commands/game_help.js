const Discord = require("discord.js");
module.exports = class myinfo{
  constructor(){
    this.name = 'help',
    this.alias = ['指令'],
    this.usage = '!help'
  }

  async run(bot, message, args){
    await message.delete();
    
    let gamehelpEmbed = new Discord.RichEmbed()
    .setTitle("**遊戲指令**")
    .addField("**__系統相關__**",
    "**!create：**``創建一位新角色``\n "+
    "**!check <裝備代碼>：**``查看裝備素質``\n"
    )
    .addField("**__角色相關指令__**",
    "**!myinfo：**``查看角色目前狀態``\n" + 
    "**!myinv：**``查看角色背包內容``\n" + 
    "**!myeq：**``查看角色裝備內容``\n" +
    "**!wear <裝備代碼>：**``穿戴裝備``\n" +
    "**!unwear <裝備代碼>：**``脫下裝備``\n"
    )
    .addField("**__冒險相關指令__**",
    "**!advs：**``查看副本地圖資料``\n" + 
    "**!adv <副本代號>：**``派遣角色冒險``\n" + 
    "**!advtime：**``查看目前角色冒險時間``\n" + 
    "**!reward：**``領取獎賞``\n" 
    )
    
    ;

    message.channel.send(gamehelpEmbed);

    }
}