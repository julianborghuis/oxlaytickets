const Discord = require("discord.js");
const config = require("../settings.json");

const TicketLogChannel = require("../utils/TicketLog");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);

const supportrole = config.supportRole;

module.exports.run = function(bot, message, args) {
	message.delete()
	
  	const modRole = message.guild.roles.find("name", `${supportrole}`);
  	if (!modRole) return message.reply(`The guild doesn't have a role called **${supportrole}**.`);

    if (!message.member.roles.has(modRole.id)) return message.reply(`Sorry! You do not have the **${supportrole}** role.`);

    if(!args[0] || args[0] == "help") return message.reply(`:x: **Opps!!** Seems like you did something wrong! Try, ${prefix}setlog <#logchannel>`);
  
    if (args[0] === 'none' || args[0] === 'null') {
        TicketLogChannel.set(message.guild.id, 'null');
        
        let embed = new Discord.RichEmbed()
		.setFooter(footer)
        .setColor(colour)
        .setDescription(`:white_check_mark: There is no longer a set Ticket Category.`);

        message.channel.send(embed);
        return;
    }
  
    let channel = message.mentions.channels.first() || message.guild.channels.get(args[0]);
  
    if (channel) {
        TicketLogChannel.set(message.guild.id, channel.id);

        let embed = new Discord.RichEmbed()
		.setFooter(footer)
        .setColor(colour)
        .setDescription(`:white_check_mark: Successfully set the log channel to ${channel.name}.`);

        message.channel.send(embed);
    } else {
        let embed = new Discord.RichEmbed()
		.setFooter(footer)
        .setColor(colour)
        .setDescription(`:x: **Opps!!** Couldn't not change the log channel, Try again and mention a channel.`);

        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "setlog",
}
