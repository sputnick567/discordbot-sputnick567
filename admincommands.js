
const adminCmds = new Map();


function admin (message, args) {
	// !admin 
}

function isOwner (message) {
	const guild = message.guild;
	return guild.ownerID === message.author.id;
}

function ping (message) {
	message.channel.send("<@!" + message.author.id + ">,");
}

function invalidArgs (message) {
	ping(message);
	message.channel.send("Invalid arguments! use !help <cmd> to get help to this command")
}


async function setPref (message, args) {
	if (!message.author.hasPermission('MANAGE_GUILD')) {
		ping(message);
		message.channel.send("You don't have the permission 'MANAGE_GUILD' to perform this command!");
	} else {
		if (args.length === 0) {
			ping(message);
			message.channel.send("Please specify a character as prefix!");
		} else if (args.length === 1) {
			if (args[0].length > 1 || args[0].length === 0) {
				ping(message);
				message.channel.send("Too long prefix (max is one character)!");
			} else {
				let newPref = args[0];
				let success = await database.setPrefix(message.guild.id, newPref);
				if (success) {
					ping(message);
					message.channel.send("Successfully set new Prefix to " + newPref);
				} else {
					message.channel.send("Some error occured. Please try again!");
				}
			}
		} else {
			invalidArgs(message);
		}
	}
}

//name, [function, usage, description, detailDescript, show in !help]
adminCmds.set("setPref", [setPref, "setPref [prefix]","set the prefix for sputnick567-bot on this server!", {"setPref": "set the prefix for sputnick567-bot on this server!"}, true]);

module.exports.adminCmds = adminCmds;