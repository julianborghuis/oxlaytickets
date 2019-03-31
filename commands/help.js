const Discord = require("discord.js");
const config = require("../settings.json");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);
const botname = (`${config.botname}`);

module.exports.run = function(bot, message, args) {
    message.delete()

    let ticketCommands = "";
		ticketCommands += `**${prefix}ticket <reason>**: Create a support ticket\n`;
		ticketCommands += `**${prefix}close**: Close your support ticket\n`;
	
	let generalCommands = "";
		generalCommands += `**${prefix}suggest <suggestion>**: Create a suggestion\n`;
		generalCommands += `**${prefix}announce <speech>**: Create an announcement\n`;
		
	let staffMembers = "";
		staffMembers += `**${prefix}add <@user>**: Adds a user to the current ticket\n`;
		staffMembers += `**${prefix}remove <@user>**: Removes a user from current ticket\n`;
		staffMembers += `**${prefix}setcategory <category|none>**: Set the ticket category\n`;
		staffMembers += `**${prefix}setlog <#logchannel>**: Sets the log channel for tickets\n`;
		staffMembers += `**${prefix}forceclose**: Forcibly a support ticket`;

    let embed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
	.setDescription(`I'm **${botname}**, A discord bot that can control & manage your servers support. I know right. It's cool!`)
    .setColor(colour)
    .setFooter(`${footer}`)
    .addField(":ticket: Ticket Commands", ticketCommands, true)
    .addField(":crown: General Commands", generalCommands, true)
    .addField(":tools: Staff Commands", staffMembers, true)

	message.channel.send({embed: embed});

}

module.exports.help = {
    name: "help"
  }
