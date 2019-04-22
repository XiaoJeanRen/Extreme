const Discord = require("discord.js");
//查看遊戲指令的指令
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
    "**!check <裝備代碼>：**``查看裝備素質``\n" +
    "**!recolor：**``自訂角色狀態的顏色``\n "
    )
    .addField("**__角色相關指令__**",
    "**!myinfo：**``查看角色目前狀態``\n" + 
    "**!myinv：**``查看角色背包內容``\n" + 
    "**!myeq：**``查看角色裝備內容``\n" +
    "**!wear <裝備代碼>：**``穿戴裝備``\n" +
    "**!unwear <裝備代碼>：**``脫下裝備``\n" +
    "**!rename：**``重新更改角色名稱``\n"
    )
    .addField("**__冒險相關指令__**",
    "**!advs：**``查看副本地圖資料``\n" + 
    "**!adv <副本代號>：**``派遣角色冒險``\n" + 
    "**!advtime：**``查看目前角色冒險時間``\n" + 
    "**!reward：**``領取獎賞``\n" 
    )
    .addField("**__交易相關指令__**",
    "**!tradeitem @使用者 <物品代碼>：**``交易裝備給另一位使用者``\n"+
    "**!pay @使用者 <金錢數量>：**``交易金錢給另一位使用者``\n"
    )
    
    ;

    message.channel.send(gamehelpEmbed);

    }
}