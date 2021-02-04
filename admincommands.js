const database = require("./db.js");
const adminCmds = new Map();

async function isAdminSender (message) {
	let adminRole = await database.getAdminRank(message.guild.id);
	if (adminRole === "") {
		message.channel.send("No admin role specified! Please ask the owner to do so!");
		return null;
	}
	if (message.member.roles.cache.some(role => role.name === adminRole)) {
		return true;
	} else {
		return false;
	}
}

function admin (message, args) {
	// !admin 

}

function ping (message) {
	message.channel.send("<@!" + message.author.id + ">,");
}

function invalidArgs (message) {
	ping(message);
	message.channel.send("Invalid arguments! use !help <cmd> to get help to this command")
}


async function setPref (message, args) {
	let isAdmin = await isAdminSender(message);
	if (isAdmin === null) {

	} else if (isAdmin) {
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
	} else {
		ping(message);
		message.channel.send("You need the admin role to perform this command!");
	}
}

//name, [function, usage, description, detailDescript, show in !help]
adminCmds.set("setPref", [setPref, "set the prefix for sputnick567-bot on this server!", {"setPref": "set the prefix for sputnick567-bot on this server!"}, true]);

module.exports.adminCmds = adminCmds;