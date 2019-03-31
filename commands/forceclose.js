const config = require("../settings.json");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);

const supportrole = config.supportRole;

module.exports.run = function(bot, message, args) {
    message.delete();

  	const modRole = message.guild.roles.find("name", `${supportrole}`);
  	if (!modRole) return message.reply(`The guild doesn't have a role called **${supportrole}**.`);

    if (!message.member.roles.has(modRole.id)) return message.reply(`Sorry! You do not have the **${supportrole}** role.`);

    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`:x: You can't use the close command outside of a ticket channel.`);

    if (message.channel.name.startsWith("ticket-")) {
        message.channel.delete();
}
}

module.exports.help = {
    name: "forceclose"
  }
