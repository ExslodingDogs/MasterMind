const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.delete();
    let modlog = message.guild.channels.find('name', 'logs');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have permission to unmute");
    if(!muteRole) return console.log(`${message.guild.name} doesnt have a muted role!`);
    if(!modlog) return console.log(`${message.guild.name} doesnt have a channel called logs!`);

    message.guild.member(user).removeRole(muteRole);
    let em = new Discord.RichEmbed()
    .setColor("#ff7700")
    .addField(`MuteInfo`, `**Unmuted By:** ${message.author.username}\n**unmuted Member:** ${user}`);
    return modlog.send(em);
}

module.exports.help = {
  name: "unmute"
}