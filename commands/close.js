const Discord = require("discord.js");
const config = require("../settings.json");

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);

module.exports.run = function(bot, message, args) {
        message.delete();

        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`:x: **Sorry Mate!** But you can't use the close command outside of a ticket.`);

              const close1 = new Discord.RichEmbed()
              .setDescription(`Looks like you want to close this ticket, Yes? The channel will be deleted.\n**Please confirm you want to close this ticket ${prefix}close**\nYour request will be avoided in 20 seconds.`)
              .setColor(`${colour}`)
              .setFooter(`${footer}`);
              message.channel.send({embed: close1}).then(m => {
                  message.channel.awaitMessages(response => response.content === `${prefix}close`, {
                      max: 1,
                      time: 10000,
                      errors: ['time'],
                  }).then((collected) => {
                      message.channel.delete();
                  }).catch(() => {
                      m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                      m2.delete();
                  }, 3000);
                  });
              });
        }

module.exports.help = {
    name: "close"
}
