const Discord = require("discord.js");
const config = require("./config.json");
const all_data = require("./serverAndplayers_datas.json");
const bot = new Discord.Client();
const fs = require("fs");
const { CommandHandler } = require("djs-commands")
const CH = new CommandHandler({
  folder: __dirname + '/commands/',
  prefix: ['!', '??', 'j']
});

bot.commands = new Discord.Collection();

bot.on("ready", () =>{
    console.log(bot.user.username + " is online.")
});

bot.on("message", (message) => {


  //一些資料和通常檢查
  if(message.channel.type === 'dm') return;
  if(message.author.type === 'bot') return;
  let args = message.content.split(" ");
  let command = args[0];
  let cmd = CH.getCommand(command);
  if(!cmd) return;

  try{
    cmd.run(bot,message,args)



  }catch(e){
    console.log(e)
  }
  

});


bot.login(config.token);
