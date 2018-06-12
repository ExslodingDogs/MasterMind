const Discord = require("discord.js");
exports.run = (client, message, args) => {
     let em =  new Discord.RichEmbed()
     .setColor("#f44242")
     .addField("**Help page 1 of 1**", `**.clear**\npermission - MessageManger\nusage - clears messages\n**.report**\npermission - none\nusage - reports a user to a staff member\n**.admin**\npermission - Bot devs only\nusage - unknown for noobs\n**stats**\nusage - shows yours stats (coins, xp, level)\npermission - none\n**robbank**\nusage - allows you to have a chance to get 200 + coins\npermission - none but you need 20 coins\n**rank**\nusage - show all ranks (.rank list)\npermission - none\n**mute**\nusage - mutes players\npermission - MessageManger\n**unmute**\nusage - unmutes players\npermission - MessageManger`);
    return message.channel.send(em).then(msg =>{msg.delete(15000)});
    }
module.exports.help = {
    name: "help"
}