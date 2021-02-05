const commands = new Map();
const Discord = require("discord.js");
const serverMngr = require("./db.js");
const argsInfo = "<arg> are optional, [arg] are required!";
const modCmd = require("./modcommands.js");
const adminCmd = require("./admincommands.js");




serverMngr.init();
function randomInt(min, max) {
	if (max < min) {
		let temp = min;
		min = max;
		max = temp;
	}
	if (max === min) {
		throw "Values are same";
	}
	let s = max - min + 1;
	return Math.floor(Math.random() * s) + min;
}

async function help  (message, args) {
	var prefix = await serverMngr.getPrefix(message.guild.id);


	if (args.length === 0) {
		console.log("normal help!");
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

function test (message, args) {
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
	message.channel.send(exampleEmbed);
}



function ping (message) {
	message.channel.send("<@!" + message.author.id + ">,");
}

function random(message, args) {
	if (args.length === 0) {
	    const number = Math.random(); // generates a random number
	    message.channel.send(number.toString()); // sends a message to the channel with the number
	} else if (args.length === 1) {
		var num = parseInt(args[0], 10);
		if (isNaN(num)) {
			invalidArgs(message);
			return;
		}
		message.channel.send(randomInt(1, num));

	} else if (args.length === 2) {
		var min = parseInt(args[0], 10);
		var max = parseInt(args[1], 10);
		if (isNaN(min) || isNaN(max)) {
			invalidArgs(message);
			console.log("min or max are NaN")
			console.log(max);
			console.log(min);
			return;
		}
		try {
			let num = randomInt(min, max);
			message.channel.send(num);
		} catch (e) {
			invalidArgs(message);
			message.channel.send(e);
		}
	} else if (args.length === 3){
		//mit abstand
	} else {
		invalidArgs(message);
	}

}

function invalidArgs (message) {
	ping(message);
	message.channel.send("Invalid arguments! use !help <cmd> to get help to this command")
}



//name, [function, usage, description, detailDescript, show in !help]
commands.set("random", [random, "random", "returns a random number",{"random": "returns a random number between 0 and 1", "random <x>": "returns a random whole number between 1 and x (included)", "random <x> <y>": "returns a whole number between x and y (both included)"}, true]);
commands.set("help", [help, "help <cmdName>", "shows list of all commands", {"help":"returns list of all commands", "help <cmdName>": "gives info to cmd"}, true]);
commands.set("test", [test, "","test command","", false])

//adding mod commands
/*Array.from(modCmd.modCmds.keys()).map(key => {
	commands.set(key, modCmd.modCmds.get(key));
});*/

//adding admin commands
console.log("Adding admin commands!");
Array.from(adminCmd.adminCmds.keys()).map(key => {
	commands.set(key, adminCmd.adminCmds.get(key));
});

module.exports.commands = commands;
module.exports.db = serverMngr;