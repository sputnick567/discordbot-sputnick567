const Discord = require("discord.js"); // imports the discord library
//const fs = require("fs"); // imports the file io library

const client = new Discord.Client(); // creates a discord client
//const token = fs.readFileSync("token.txt").toString(); // gets your token from the file
const db = require("./db.js");
db.init();
const cmdMngr = require("./commands.js");
client.once("ready", () => { // prints "Ready!" to the console once the bot is online
	console.log("Ready!");
});





const prefix = "!";
const argsInfo = "<arg> are optional, [arg] are required!";

let commands = cmdMngr.commands;





function modhelp (message) {

}

function report (message) {

}

function help  (message) {
	var args = getArgs(message);
	if (args.length === 0) {
		var embed = new Discord.MessageEmbed().setColor('#0099ff')
		.setTitle('Sputnick567 bot help').setDescription('All available commands').setFooter(argsInfo);
		var keys = commands.keys();
		//console.log(message.guild.roles.cache.find(role => role.name === "Rolename"));


		
		
		for (var key of keys) {
			if (commands.get(key)[4]) {
			embed.addField(prefix + commands.get(key)[1], commands.get(key)[2], false);
			}
		}
		ping(message);
		message.channel.send(embed);
	} else if (args.length === 1){
		if (commands.has(args[0])) {
			if (commands.get(args[0])[4]) {
				var cmdInfo = commands.get(args[0]);
				var embed = new Discord.MessageEmbed();
				embed.setColor("#23d6a0").setFooter(argsInfo).setTitle(args[0]).setDescription("Info to command " + args[0]);
				for (var key of Object.keys(cmdInfo[3])) {
					embed.addField(key, cmdInfo[3][key], false);
				}
				message.channel.send(embed);
			} else {
				message.channel.send("No such command: " + args[0]);
			}
		} else {
			message.channel.send("No such command: " + args[0]);
		}
	} else {
		invalidArgs(message);
	}
}



function test (message) {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Sputnick567 bot help')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
	let server = message.guild.id;
	console.log(server);
	console.log(db.getCommands(server));
}





client.on("message", message => {
    if (message.content[0] === prefix) {
        const command = message.content.split(" ")[0].substr(1); // gets the command name
        if (commands.has(command)) { // checks if the map contains the command
            commands.get(command)[0](message); // runs the command
        }  

        else {
        	message.channel.send("for help type " + prefix + "help");
        }
    } else if (message.content === 'ping') {
    	message.channel.send("pong!");
    } 
});

try {
client.login(process.env.BOT_TOKEN);
} catch (error) {
	console.log("Some Error");
}
//client.login(token); // starts the bot up