const Discord = require("discord.js");
//查看遊戲指令的指令
module.exports = class help{
  constructor(){
    this.name = 'help',
    this.alias = ['指令'],
    this.usage = '!help'
  }

  async run(bot, message, args){
    await message.delete();
    
    let gamehelpEmbed = new Discord.RichEmbed()
    .setTitle("**官方網站點我!!!!**")
    .setThumbnail(bot.user.displayAvatarURL)
    .setURL("https://hackmd.io/s/BkpQWRTcE")
    .addField("**公告**",
    "```1. 2019/4/24已重新刪檔，測試新數值\n" +
    "2. RPG遊戲測試階段，資料隨時可能刪除```"
     )
    .addField("**近期更新**",
    "__1. 新增了!翔哥和!猴子和!狼人殺指令\n" +
    "2. 新增了官方網址，請點選最上面的標題\n" +
    "3. 新增了!mys更詳細的角色資料指令\n__"
     )
    .addField("**__系統相關__**",
    "**!翔哥：**``查看一位井底之蛙``\n "+
    "**!猴子：**``查看一個猴子``\n "+
    "**!狼人殺：**``查看一個有工作的高端人種``\n "+
    "**!create：**``創建一位新角色``\n "+
    "**!check <裝備代碼>：**``查看裝備素質``\n" +
    "**!recolor：**``自訂角色狀態的顏色``\n " +
    "**!drop <裝備代碼>：**``丟棄背包內的裝備``\n " +
    "**!clearInv：**``丟棄背包內所有的裝備``\n " 
    )
    .addField("**__角色相關指令__**",
    "**!myi：**``查看角色目前資料``\n" + 
    "**!mys：**``查看角色詳細狀態``\n" + 
    "**!myinv：**``查看角色背包內容``\n" + 
    "**!myeq：**``查看角色裝備內容``\n" +
    "**!wear <裝備代碼>：**``穿戴裝備``\n" +
    "**!unwear <裝備代碼>：**``脫下裝備``\n" +
    "**!rename：**``重新更改角色名稱``\n" +
    "**!levelup：**``升級角色等級``\n" 
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