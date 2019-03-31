const Discord = require("discord.js");
const config = require("../settings.json");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);

const supportrole = config.supportRole;

module.exports.run = function(bot, message, args) {
  	const modRole = message.guild.roles.find("name", `${supportrole}`);
  	if (!modRole) return message.reply(`The guild doesn't have a role called **${supportrole}**.`);

    if (!message.member.roles.has(modRole.id)) return message.reply(`Sorry! You do not have the **${supportrole}** role.`);



    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let channel = message.guild.channels.find(`name`, message.channel.name);
    if(!channel) return message.channel.send("Couldn't find the ticket channel.");
    message.delete().catch(O_o=>{});


    message.channel.overwritePermissions(rUser, {
          READ_MESSAGES: true,
          SEND_MESSAGES: true
    });

    let embed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription(`${rUser} has been added!`)
    .setTimestamp();

    message.channel.send(embed);

}

module.exports.help = {
    name: "add"
  }
