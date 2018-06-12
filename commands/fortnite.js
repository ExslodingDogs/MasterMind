const Discord = require('discord.js');
const botsettings = require("../botsettings/bot.json");
const fortnite = require('fortnite');
const ft = new fortnite(botsettings.fortnitekey);

exports.run = (client, message, args) => {
    
   let user = args[0];
   let platform = args[1] || "pc";
   if(!user)return message.channel.send(`you must enter a epic games account .fortnite ninja pc`).then(msg =>{msg.delete(10000)});

   let data = ft.user(user, platform).then(data =>{

    let stats = data.stats;
    let player = stats.lifetime;
    let kills = player[10] [`Kills`];
    let wins = player[8] [`Wins`];
    let gamesplayed = player[7] [`Matches Played`];
console.log(player);
    let em = new Discord.RichEmbed()
    .setColor("#f79927")
    .addField(`${user}'s fortnite stats`,`**kills:**${kills}\n**wins:**${wins}\n**games played:**${gamesplayed}`);

    return message.channel.send(em).then(msg =>{msg.delete(10000)});
   });


}

module.exports.help = {
  name: "fortnite"
}