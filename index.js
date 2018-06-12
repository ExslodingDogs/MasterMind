const botsettings = require("./botsettings/bot.json");
const fortnite = require('fortnite');
const ft = new fortnite(botsettings.fortnitekey);
const config = require("./prefix.json");
const Discord = require("discord.js");
const fs = require("fs");
const coins = require("./PlayerData/stats.json");
const xp = require("./PlayerData/stats.json");
const database = require("./PlayerData/users.json");
const perms = require("./PlayerData/permissions.json");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const swear = require("./botsettings/swear.js");
fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	}
	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
		
	});
});

bot.on("ready", async () => {
	console.log(`name : ${bot.user.username}`)
	console.log(`Amount of servers on : ${bot.guilds.size}`);
	setTimeout(() => {
		bot.user.setStatus(`online`);
		bot.user.setActivity(".help", {type: "PLAYING"});
		console.log("Rebooted!!");
	}, 10 * 1000);
	bot.user.setStatus(`dnd`);
	bot.user.setActivity("REBOOTING", {type: "PLAYING"});
	console.log("Rebooting...");
});
bot.on("message", async message => {
  if(message.author.bot) return;
	if(message.channel.type === "dm") return;
  if(!coins[message.author.id]){
	  coins[message.author.id] = {
		  coins:0,
		  xp: 0,
      level:1
		};
		fs.writeFile("./PlayerData/stats.json", JSON.stringify(coins), (err) => {
			if (err) console.log(err)
		});
	}
	if(!perms[message.author.id]){
		perms[message.author.id] ={
			name: message.author.username,
			admin: false,
			vip: false,
			default: true,
			clear: false
		};
		fs.writeFile("./PlayerData/permissions.json", JSON.stringify(perms), (err) => {
			if (err) console.log(err)
		});

	}
	let prefix = config.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	let coinsatm = Math.floor(Math.random() * 15) + 1;
	let baseatm = Math.floor(Math.random() * 16) + 1;
	let baseatmm = Math.floor(Math.random() * 15) + 1;
	let xpatm = Math.floor(Math.random() * 20) + 1;
	let curcoins = coins[message.author.id].coins;
	let curlevel = xp[message.author.id].level;
	let curxp = xp[message.author.id].xp;
	let nextlevelxp = 30*curlevel;
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(!database[message.author.id] === message.author.username){
		database[message.author.id]={
			name: message.author.username
		};
		fs.writeFile("./PlayerData/users.json", JSON.stringify(database), (err) => {
			if(err) console.log(err)
		});
		console.log(`[DataBaseUpdate] updated ${message.author.username}`);
	}

	if(curxp === nextlevelxp){
		xp[message.author.id] ={
			coins: curcoins,
			xp: 0,
			level: curlevel +1
		};
		fs.writeFile("./PlayerData/stats.json", JSON.stringify(xp), (err) => {
			if(err) console.log(err)
		});
		let levelup = new Discord.RichEmbed()
		.setColor("#02ffc7")
		.addField("LEVEL UP!", `${message.author.username} has LEVELED UP!`);
		return message.channel.send(levelup).then(msg => {msg.delete(10 * 1000)});
	}

  if(xpatm === baseatmm){
	coins[message.author.id] = {
		coins: curcoins,
		xp: xp[message.author.id].xp + 10,
		level: curlevel
	};
	fs.writeFile("./PlayerData/stats.json", JSON.stringify(xp), (err) => {
		if (err) console.log(err)
	});

	let addedcoins = new Discord.RichEmbed()
	.setColor("#02ffc7") 
	.addField(`${message.author.username} has earned`, ":moneybag: 5 coins");
	return message.channel.send(addedcoins).then(msg => {msg.delete(5000)});
}
  if(coinsatm === baseatm){
	  coins[message.author.id] = {
		  coins: curcoins +5,
		  xp: curxp +10,
		  level: curlevel
	  };
	  fs.writeFile("./PlayerData/stats.json", JSON.stringify(coins), (err) => {
		  if (err) console.log(err)
	  });
	  let addedcoins = new Discord.RichEmbed()
	  .setColor("#02ffc7") 
	  .addField(`${message.author.username} has earned`, ":moneybag: 5 coins");
	  return message.channel.send(addedcoins).then(msg => {msg.delete(5000)});
  }
});
bot.on("guildMemberAdd", (member) => {
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
	let welcomerole = member.guild.roles.find('name', 'Member');
	if(!welcomerole) return console.log(`${member.guild.name}has not got a role called member!`);
	member.addRole(welcomerole);
});

bot.on('message', msg => {
	if(!msg.author.id === "274892247655514112" || !msg.author.id === "377925906494259201"){
	if (msg.guild)
	{
			var string = msg.content;
			var word = string.split(" ");
			var lower = string.toLowerCase();
			for (i = 0; i < 554; i++)
			{
					if (lower.indexOf(swear.list[i]) >= 0)
					{
						console.log(`[BadWord] ${msg.author.username} has been detected saying "${swear.list[i]}"`);
							msg.channel.send(`${msg.author} Please do not use bad words!`).then(message =>{message.delete(5000)});
							msg.delete();
							break;
					}
			}
	}
}
});

bot.login(process.env.BOT_TOKEN);
