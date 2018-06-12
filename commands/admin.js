const Discord = require("discord.js");
const fs = require("fs");
const stats = require("../PlayerData/stats.json");
const users = require("../PlayerData/users.json");


module.exports.run = async (bot, message, args) => {

    if(message.author.id != "377925906494259201"){
        if(message.author.id != "274892247655514112"){
            let em = new Discord.RichEmbed()
            .setColor("#db160f")
            .addField("Permissions Error", `${message.author} You dont have permissions to do this!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
         }    
        }

        if(!args[0]){
            let em = new Discord.RichEmbed()
            .setColor("#db160f")
            .addField("Command Error", `${message.author} You are missing the command .admin <command>!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }

        //help command
        if(args[0] === "help"){
            let em = new Discord.RichEmbed()
            .setColor("#0fdb12")
            .addField(`**help for admins**`, `**.idlookup**\nusage: looks up a players to see if there in the database\n**.setcoins**\nusage: sets a players coins\n**.setxp**\nusage: sets a players xp\n**.setlevel**\nusage: sets a players level`)
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
        }


        //setlevel
        if(args[0] === "setlevel"){
            let user = message.mentions.users.first();
            let level = args[2];
            if(!user){
            let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} You are missing the player .admin setlevel @player <level>!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }
            if(!level){
            let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} You are missing the level .admin setlevel @player <level>!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }
            if(!stats[user.id]){
                let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} this player is not in the DataBase!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }

             if(level < 0){
            let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} You carnt set a players level to a number under 0!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
             }

             stats[user.id] ={
                 coins: stats[user.id].coins,
                 xp: stats[user.id].xp,
                 level: level
             };
             fs.writeFile("./PlayerData/stats.json", JSON.stringify(stats), (err) =>{
                 if(err) return console.log(err);
             });
             let em = new Discord.RichEmbed()
            .setColor("#0fdb12")
            .addField("Command successful", `${message.author} You have set ${user} 's level to ${level}!`);
        return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }
        //setcoins
        if(args[0] === "setcoins"){
            let user = message.mentions.users.first();
            let coins = args[2];
            if(!user){
            let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} You are missing the player .admin setcoins @player <level>!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }
            if(!coins){
            let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} You are missing the coins .admin setcoins @player <coins>!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }

            if(!stats[user.id]){
                let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} this player is not in the DataBase!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }
             if(coins < 0){
            let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} You carnt set a players coins to a number under 0!`);
            return message.channel.send(em).then(msg =>{msg.delete(10000)});
             }
             stats[user.id] ={
                 coins: coins,
                 xp: stats[user.id].xp,
                 level: stats[user.id].level
             };
             fs.writeFile("./PlayerData/stats.json", JSON.stringify(stats), (err) =>{
                 if(err) return console.log(err);
             });
             let em = new Discord.RichEmbed()
             .setColor("#0fdb12")
             .addField("Command successful", `${message.author} You have set ${user} 's coins to ${coins}!`);
             return message.channel.send(em).then(msg =>{msg.delete(10000)});
        }
    //setxp
    if(args[0] === "setxp"){
        let user = message.mentions.users.first();
        let xp = args[2];
        if(!user){
        let em = new Discord.RichEmbed()
            .setColor("#db160f")
            .addField("Command Error", `${message.author} You are missing the player .admin setxp @player <xp>!`);
        return message.channel.send(em).then(msg =>{msg.delete(10000)});
        }
        if(!coins){
        let em = new Discord.RichEmbed()
            .setColor("#db160f")
            .addField("Command Error", `${message.author} You are missing the xp .admin setxp @player <xp>!`);
        return message.channel.send(em).then(msg =>{msg.delete(10000)});
        }

        if(!stats[user.id]){
            let em = new Discord.RichEmbed()
            .setColor("#db160f")
            .addField("Command Error", `${message.author} this player is not in the DataBase!`);
        return message.channel.send(em).then(msg =>{msg.delete(10000)});
        }
        
         if(xp < 0){
        let em = new Discord.RichEmbed()
            .setColor("#db160f")
            .addField("Command Error", `${message.author} You carnt set a players xp to a number under 0!`);
        return message.channel.send(em).then(msg =>{msg.delete(10000)});
         }

         stats[user.id] ={
             coins: stats[user.id].coins,
             xp: xp,
             level: stats[user.id].level
         };
         fs.writeFile("./PlayerData/stats.json", JSON.stringify(stats), (err) =>{
             if(err) return console.log(err);
         });
         let em = new Discord.RichEmbed()
            .setColor("#0fdb12")
            .addField("Command successful", `${message.author} You have set ${user} 's xp to ${xp}!`);
        return message.channel.send(em).then(msg =>{msg.delete(10000)});
        }
        if(args[0] === "idlookup"){
            let id = args[1];
            if(users[id]){
                let em = new Discord.RichEmbed()
                .setColor("#0fdb12")
                .addField("Command successful", `${message.author} User found\n**information**\n**name:** ${users[id].name}`);
                return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }else if(!users[id]){
                let em = new Discord.RichEmbed()
                .setColor("#db160f")
                .addField("Command Error", `${message.author} user not found!`);
                return message.channel.send(em).then(msg =>{msg.delete(10000)});
            }
        }
  }

module.exports.help = {
  name: "admin"
}