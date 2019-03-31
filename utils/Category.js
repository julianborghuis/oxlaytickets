const fs = require("fs");
const settings = require("../settings.json");

class Prefix {
    
    static get(guildId) {
    
        let category = JSON.parse(fs.readFileSync("./Json/category.json", "utf8"));

        if (!category[guildId]) {
            category[guildId] = {
                id: "null"
            }

            fs.writeFileSync("./Json/category.json", JSON.stringify(category, null, 4), err => {
                if (err) console.log(err);
            });

            return "null";
    
            
        } else {
            return category[guildId].id;
        }
    }
    
    static set(guildId, value) {
        let category = JSON.parse(fs.readFileSync("./Json/category.json", "utf8"));
        
        category[guildId] = {
            id: value
        }

        fs.writeFileSync("./Json/category.json", JSON.stringify(category, null, 4), err => {
            if (err) console.log(err);
        });

        return value;
    }
    
    static reset(guildId) {
        let category = JSON.parse(fs.readFileSync("./Json/category.json", "utf8"));
        
        category[guildId] = {
            id: "null"
        }

        fs.writeFileSync("./Json/category.json", JSON.stringify(category, null, 4), err => {
            if (err) console.log(err);
        });

        return "null";
    }
}

module.exports = Prefix;