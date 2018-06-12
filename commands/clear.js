const Discord = require("discord.js");
const perms = require("../PlayerData/permissions.json");
module.exports.run = async (bot, message, args) => {

  //!clear 15
  if(!perms[message.author.id].clear === true || !perms[message.author.id].admin === true || message.author.id != "77925906494259201"){
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
      return message.channel.send(`${message.author} oof you dont have perms to do this.`).then(msg=>{msg.delete(10000)});
    }
  }
  if(!args[0]) return message.channel.send("This Command is for Mods +");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}