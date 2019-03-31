const Discord = require("discord.js");

const config = require("../settings.json");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);

module.exports.run = function(bot, message, args) {
    message.delete();

    if(!args[0] || args[0] == "help") return message.reply(`:x: **Opps!!** Seems like you did something wrong! Try, suggest <suggestion>`);

    let embed = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
    .setDescription("Suggestion: " + args.join(" "))
    .setFooter(footer)
    
    let suggestchannel = message.guild.channels.find(`name`, "suggestions");
    if(!suggestchannel) return message.channel.send(":x: **Opps!** Cannot find the channel ``suggestions``");

    suggestchannel.send(embed)
}

module.exports.help = {
    name: "suggest",
}


