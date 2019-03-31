const Discord = require("discord.js");
const config = require("../settings.json");

const TicketCategory = require('../utils/Category');
const TicketId = require('../utils/TicketId');
const TicketLog = require('../utils/TicketLog')

const footer = (`${config.footer}`);
const colour = (`${config.colour}`);
const prefix = (`${config.prefix}`);
const botname = (`${config.botname}`);

const ticketmsg = config.ticketmessage;
const supportrole = config.supportRole;

module.exports.run = function(bot, message, args) {
    message.delete();

    let ticketId = TicketId.pad(message.guild.id);
    var id = Math.floor(Math.random() * 100) + 10;  

    const dmbed = new Discord.RichEmbed()
        .setDescription(`:ticket: Your **Support Pin**: ${id}`)
        .setFooter(`Please use this PIN to verify your support ticket.`)
    message.author.send({embed: dmbed});

    const issue = message.content.split(' ').slice(1).join(' ');
    let subject;
    if (!issue) subject = 'Invalid Reason!.';
    if (issue) subject = issue;


    if (message.guild.channels.exists('name', 'ticket-' + ticketId)) return message.channel.send(`A ticket with ID ${ticketId} is already open.`);
    
    message.guild.createChannel(`ticket-${ticketId}`, 'text').then(channel => {
        let supportRole = message.guild.roles.find(`name`, `${supportrole}`);
        let everyoneRole = message.guild.roles.find('name', '@everyone');
        
        channel.overwritePermissions(everyoneRole, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        
        channel.overwritePermissions(supportRole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        
        channel.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
  
        channel.overwritePermissions(bot.user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        
        let category = message.guild.channels.get(TicketCategory.get(message.guild.id));
        
        if (category) {
            channel.setParent(category.id);
        } else {
            if(message.guild.channels.get(TicketCategory.get(message.guild.id))){
                channel.setParent(message.guild.channels.get(TicketCategory.get(message.guild.id)).id);
            }
        }
  
        let successEmbed = new Discord.RichEmbed()
        .setDescription(`:white_check_mark: Hello, <@${message.author.id}>,\nYour support ticket has opened <#${channel.id}>`)
        .setColor(colour);
        
        message.channel.send(successEmbed);

//      # === === CHANGE TICKET IN SETTINGS.JSON == == #
        let ticketMessage = `Hey! <@${message.author.id}>\n${ticketmsg}`;
  
        let embed = new Discord.RichEmbed()
        .setColor(colour)
        .setDescription(ticketMessage)
        .addField('Case', ticketId, true);
  
        if (subject != 'Invalid Reason!.') {
            embed.addField('Reason', subject, true);
        }
  
        channel.send(embed);

        let usernameEmbed = new Discord.RichEmbed()
        .setTitle(":newspaper: Whats Your **Support Pin?**")
        .setFooter(`Please check your Direct Messages for your verification PIN.`)
        .setColor(`${colour}`)
        channel.send(usernameEmbed);

        channel.awaitMessages

        channel.awaitMessages(response => response.content.length > 1, {
            max: 1,
            time: 50000,
            errors: ['time'],
          })
          .then((collected) => {

            if (collected.first().content == id) {
                var verify = ":white_check_mark: **Support PIN Verified**"
                message.author.send(`:white_check_mark: **Support PIN Verified**`)                                                            
            } else {                                                                  
                if (collected.first().content !== id) {
                    var verify = ":x: **Support PIN Denied**"
                    message.author.send(`:x: **Support PIN Denied**`)
                    message.author.send(`Ticket is Automatically Closing!`)
                    channel.delete()
                }
            }

        let q1Embed = new Discord.RichEmbed()
        .setTitle(":white_check_mark: Verified Successfully")
        .addField(":robot: **Hello**,", `I'm **${botname}**\nThank you for verifing your support ticket.\nA support agent will arrive here as soon as possible, Please wait patiently\nFor the meanwhile you might aswell elaborate on your question.`)
        .setColor(`${colour}`)
        channel.send({embed: q1Embed});

        })

        let logEmbed = new Discord.RichEmbed()
        .setColor(colour)
        .setFooter(footer)
        .setTitle(":ticket: Support Ticket Opened")
        .setDescription(`Ticket Opened: #ticket-${ticketId}\nOpened By: <@${message.author.id}>`);
        
        if (subject !== 'Invalid Reason!.') {
            logEmbed.addField('Reason', subject, true);
        }
  
        let logChannel = TicketLog.channel(message.guild);
        
        if (logChannel) {
            logChannel.send(logEmbed);
        }
    }).catch(err=>{console.error(err)});
  };

module.exports.help = {
    name: "ticket"
  }

