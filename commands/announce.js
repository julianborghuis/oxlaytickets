const Discord = require("discord.js");

const config = require("../settings.json");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);
const botname = (`${config.botname}`)

const announcementchannel = config.announcementchannel;
const supportrole = config.supportRole;

module.exports.run = function(bot, message, args) {
    message.delete();

    const modRole = message.guild.roles.find("name", `${supportrole}`);
    if (!modRole) return message.reply(`The guild doesn't have a role called **${supportrole}**.`);

  if (!message.member.roles.has(modRole.id)) return message.reply(`Sorry! You do not have the **${supportrole}** role.`);

      if(!args[0] || args[0] == "help") return message.reply(`:x: **Opps!!** Seems like you did something wrong! Try, ${prefix}announce <speech>`);
  

      const sayMessage = args.join(" ");
      message.delete().catch();

      const embed = new Discord.RichEmbed()
    .setTitle(":loudspeaker: Automated Announcement")
    .setDescription(`${sayMessage}`)
    .setTimestamp()
    .setColor(colour)
    .setFooter(`${footer}`, message.author.displayAvatarURL);

      let annChannel = message.guild.channels.find(`name`, `${announcementchannel}`);
      if(!annChannel) return message.channel.send(`:x: Looks like you are missing the **${announcementchannel}** channel`);

      annChannel.send(embed);

}


module.exports.help = {
    name: "announce",
}


