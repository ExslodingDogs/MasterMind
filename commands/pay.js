const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../PlayerData/stats.json");

module.exports.run = async (bot, message, args) => {
  //!pay @isatisfied 59345

  if(!coins[message.author.id]){
    return message.reply("You don't have any coins!").then(msg => {msg.delete(10000)});
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let pXP = coins[pUser.id].xp;
  let pLevel = coins[pUser.id].level;
  let sCoins = coins[message.author.id].coins;
  console.log(pUser.id);
  if(sCoins < args[1]) return message.reply("Not enough coins there!").then(msg => {msg.delete(10000)});

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1]),
    xp: coins[message.auhtor.id].xp,
    level: coins[message.author.id].level
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1]),
    xp: pXP,
    level: pLevel
  };

  message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`).then(msg => {msg.delete(10000)});

  fs.writeFile("../PlayerData/stats.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "pay"
}