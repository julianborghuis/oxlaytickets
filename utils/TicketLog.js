const fs = require("fs");
const settings = require("../settings.json");

class TicketLogChannel {
    
    static channel(guild) {
        return guild.channels.get(this.get(guild.id));
    }
    
    static get(guildId) {
    
        let ticketLogChannels = JSON.parse(fs.readFileSync("./Json/ticketLog.json", "utf8"));

        if (!ticketLogChannels[guildId]) {
            ticketLogChannels[guildId] = {
                id: "null"
            }

            fs.writeFileSync("./Json/ticketLog.json", JSON.stringify(ticketLogChannels, null, 4), err => {
                if (err) console.log(err);
            });

            return "null";
    
            
        } else {
            return ticketLogChannels[guildId].id;
        }
    }
    
    static set(guildId, value) {
        let ticketLogChannels = JSON.parse(fs.readFileSync("./Json/ticketLog.json", "utf8"));
        
        ticketLogChannels[guildId] = {
            id: value
        }

        fs.writeFileSync("./Json/ticketLog.json", JSON.stringify(ticketLogChannels, null, 4), err => {
            if (err) console.log(err);
        });

        return value;
    }
    
    static reset(guildId) {
        let ticketLogChannels = JSON.parse(fs.readFileSync("./Json/ticketLog.json", "utf8"));
        
        ticketLogChannels[guildId] = {
            id: "null"
        }

        fs.writeFileSync("./Json/ticketLog.json", JSON.stringify(ticketLogChannels, null, 4), err => {
            if (err) console.log(err);
        });

        return "null";
    }
}

module.exports = TicketLogChannel;