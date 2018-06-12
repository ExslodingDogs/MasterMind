const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel.send(".report @<user> <reason>"));
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel.send(".report @<user> <reason>"));

    let reportEmbed = new Discord.RichEmbed()
    .setColor("#ff7700")
    .addField(`Report info on ${rUser.user.username}`, `**Reason:** ${rreason}\n**Reported By:** ${message.author}\n**Time:** ${message.createdAt}`)

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
