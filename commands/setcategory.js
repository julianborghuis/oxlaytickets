const Discord = require("discord.js");
const config = require("../settings.json");

const TicketCategory = require("../utils/Category");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);

const supportrole = config.supportRole;

module.exports.run = function(bot, message, args) {
	message.delete()
	
  	const modRole = message.guild.roles.find("name", `${supportrole}`);
  	if (!modRole) return message.reply(`The guild doesn't have a role called **${supportrole}**.`);

    if (!message.member.roles.has(modRole.id)) return message.reply(`Sorry! You do not have the **${supportrole}** role.`);

    if(!args[0] || args[0] == "help") return message.reply(`:x: **Opps!!** Seems like you did something wrong! Try, ${prefix}setcategory <ticketcatory|none>`);
  
    if (args[0] === 'none' || args[0] === 'null') {
        TicketCategory.set(message.guild.id, 'null');
        
        let embed = new Discord.RichEmbed()
        .setColor(colour)
		.setFooter(footer)
        .setDescription(`:white_check_mark: No Category set.`);

        message.channel.send(embed);
        return;
    }
  
    let category = message.guild.channels.find('name', args.join(' ')) || message.guild.channels.get(args[0]);
  
    if (category) {
        TicketCategory.set(message.guild.id, category.id);

        let embed = new Discord.RichEmbed()
        .setColor(colour)
		.setFooter(footer)
        .setDescription(`:white_check_mark: Ticket's will now be opened at the category, ${category.name}.`);

        message.channel.send(embed);
    } else {
        let embed = new Discord.RichEmbed()
        .setColor(colour)
		.setFooter(footer)
        .setDescription(`:x: **Opps!! Sorry Mate!** Looks like the Ticket Category could not be changed. This is case sensitive.`);

        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "setcategory",
}
