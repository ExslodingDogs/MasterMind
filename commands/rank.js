const Discord = require('discord.js');
const coin = require("../PlayerData/stats.json");
const fs = require("fs");

exports.run = (client, message, args) => {
    let curcoins = coin[message.author.id].coins;
    //Ranks
    let viprank = client.guilds.get(message.guild.id).roles.find('name', 'VIP');
    let lordrank = client.guilds.get(message.guild.id).roles.find('name', 'Lord');

    //Code
    if(args[0] == "list"){
        let vip = new Discord.RichEmbed()
        .setColor("#02ffc7")
        .addField("**Ranks**", `**VIP**\n**Perks:** Join VIP Chat, Coloured name, chenage nickname perms\n**cost:** 300coins\n**Lord**\n**Perks:** Use SuperChat, Coloured name, chenage nickname perms\n**cost:** 500coins`);
        return message.channel.send(vip).then(msg =>{msg.delete(10000)});
    }
    if(args[0] == "buy"){
        if(!viprank) return message.channel.send("VIP rank not found!");
        if(!args[1]) return message.channel.send(".rank buy <rank>");
        if(args[1] == "vip"){
            if(message.member.roles.find("name", "vip")) return message.channel.send(`${message.author} you already have vip rank!`).then(msg =>{msg.delete(10000)});
            if(curcoins >= 300){
                message.member.addRole(viprank);
                coin[message.author.id] = {
                    coins: curcoins-300,
                    xp: coin[message.author.id].xp,
                level: coin[message.author.id].level
                  };
                  fs.writeFile("./PlayerData/stats.json", JSON.stringify(coin), (err) => {
                      if (err) console.log(err)
                  });
                return message.channel.send(`${message.author} has just payed 300 coins for vip rank!`).then(msg =>{msg.delete(10000)});
            }else{
                return message.channel.send("you need 300 coins!").then(msg =>{msg.delete(10000)});
            }
        }
        if(args[1] == "lord"){
            if(message.member.roles.find("name", "Lord")) return message.channel.send(`${message.author} you already have lord rank!`).then(msg =>{msg.delete(10000)});
            if(curcoins >= 500){
                message.member.addRole(lordrank);
                coin[message.author.id] = {
                    coins: curcoins-500,
                    xp: coin[message.author.id].xp,
                level: coin[message.author.id].level
                  };
                  fs.writeFile("./PlayerData/stats.json", JSON.stringify(coin), (err) => {
                      if (err) console.log(err)
                  });
                return message.channel.send(`${message.author} has just payed 500 coins for lord rank!`).then(msg =>{msg.delete(10000)});
            }else{
                return message.channel.send("you need 500 coins!").then(msg =>{msg.delete(10000)});
            }
        }
    }
}
module.exports.help = {
  name: "rank"
}
