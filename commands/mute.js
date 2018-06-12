const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.delete();
    let modlog = message.guild.channels.find('name', 'logs');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
    let reason = message.content.split(' ').slice(2).join(' ');
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have permission to unmute");

    if(!muteRole) return console.log(`${message.guild.name} doesnt have a muted role!`);
    if(!modlog) return console.log(`${message.guild.name} doesnt have a channel called logs!`);
    if(!reason) return message.reply(".mute @<player> <reason>");
    message.guild.member(user).addRole(muteRole);
    let mutesInfo = new Discord.RichEmbed()
    .setColor("#ff7700")
    .addField(`MuteInfo`, `**Muted By:** ${message.author.username}\n**Muted Member:** ${user}\n**Reason:** ${reason}`);
    return modlog.send(mutesInfo);

}

module.exports.help = {
  name: "mute"
}
