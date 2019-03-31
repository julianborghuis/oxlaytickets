// ____  _                   _    _____ _     _       _      _____     _   
//|    \|_|___ ___ ___ ___ _| |  |_   _|_|___| |_ ___| |_   | __  |___| |_ 
//|  |  | |_ -|  _| . |  _| . |    | | | |  _| '_| -_|  _|  | __ -| . |  _|
//|____/|_|___|___|___|_| |___|    |_| |_|___|_,_|___|_|    |_____|___|_| 

// Developed By: Emerald's Hangout
// Resource Version: v3.1
// Emerald's Hangout: https://discord.gg/hmWgxdF
// Resource: https://www.mc-market.org/resources/8940/

const Discord = require('discord.js');
const settings = require('./settings.json');
const fs = require("fs");

const prefix = (`${settings.prefix}`);

const botname = settings.botname;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`[Discord Ticket Bot] Loaded Command -> ${f}.`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", () => {
  console.log(" ____  _                   _    _____ _     _       _      _____     _\n|    \|_|___ ___ ___ ___ _| |  |_   _|_|___| |_ ___| |_   | __  |___| |_\n|  |  | |_ -|  _| . |  _| . |    | | | |  _| '_| -_|  _|  | __ -| . |  _|\n|____/|_|___|___|___|_| |___|    |_| |_|___|_,_|___|_|    |_____|___|_| ")
  console.log(`Connected to Discord!!....\nInvite Link: https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot\n\nBot Name: ${bot.user.username}\nNumber of Servers: ${bot.guilds.size}`);

  bot.user.setActivity(`${prefix}help | ${botname}`, {type: "PLAYING"});

});

bot.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content.indexOf(settings.prefix) !== 0) return;

  let prefix = settings.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);

});

bot.login(settings.token);
