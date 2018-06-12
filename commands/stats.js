const Discord = require("discord.js");
const coins = require("../PlayerData/stats.json");
const xp = require("../PlayerData/stats.json");

exports.run = (client, message, args) => {
    let curcoins = coins[message.author.id].coins;
    let curxp = xp[message.author.id].xp;
    let curlevel = xp[message.author.id].level;
    let check = message.mentions.users.first();

    if(!check){
        let stats = new Discord.RichEmbed()
        .setColor("#02ffc7")
        .setThumbnail(message.author.avatarURL)
        .addField(`**${message.author.username}'s Stats**`, `**Coins:** ${curcoins}\n**XP:** ${curxp}\n**Level:** ${curlevel}`);
        return message.channel.send(stats).then(msg => {msg.delete(10000)});
    }
    if(check){
        let stats = new Discord.RichEmbed()
        .setColor("#02ffc7")
        .setThumbnail(check.avatarURL)
        .addField(`**${check.username}'s Stats**`, `**Coins:** ${xp[check.id].coins}\n**XP:** ${xp[check.id].xp}\n**Level:** ${xp[check.id].level}`);
        return message.channel.send(stats).then(msg =>{msg.delete(10000)});
    }
}
module.exports.help = {
    name: "stats"
  }