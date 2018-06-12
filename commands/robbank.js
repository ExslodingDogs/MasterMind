const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../PlayerData/stats.json");
const xp = require("../PlayerData/stats.json");

exports.run = (client, message, args) => {
  let curcoins = coins[message.author.id].coins;
  let curxp = xp[message.author.id].xp;
  let curlevel = xp[message.author.id].level;
  let chance = Math.floor(Math.random() * 5) + 0;
  let money = Math.floor(Math.random() * 100) + 200;
  if(curcoins <= 19) {
    return message.channel.send("You need 20 or more coins to rob a bank!").then(msg => {msg.delete(15000)});
  }
  if(chance === 2){
    coins[message.author.id] = {
      coins: curcoins + money,
      xp: curxp,
      level: curlevel
    };
    fs.writeFile("./PlayerData/stats.json", JSON.stringify(coins), (err) =>{
      if(err) console.log(err)
    });
    let win = new Discord.RichEmbed()
    .addField(`Bank Robbers`, `${message.author.username} has just robbed a bank and got a way!\n**total earnings:** ${money}`);
    return message.channel.send(win).then(msg => {msg.delete(15000)});
  }
  if(chance != 2){
    coins[message.author.id] = {
      coins: 0,
      xp: curxp,
      level: curlevel
    };
    fs.writeFile("./PlayerData/stats.json", JSON.stringify(coins), (err) =>{
      if(err) console.log(err)
    });
    let loose = new Discord.RichEmbed()
    .addField("Bank Robbers", `${message.author.username} has failed to robbed the bank and lost all there money !`);
    return message.channel.send(loose).then(msg => {msg.delete(15000)})
  }

}
module.exports.help = {
    name: "robbank"
  }