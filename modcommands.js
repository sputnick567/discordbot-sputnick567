const Discord = require("discord.js");

function ping (message) {
	message.channel.send("<@!" + message.author.id + ">,");
}

function removeElement(element, array) {
	const index = array.indexOf(element);
	if (index > -1) {
		array.splice(index, 1);
	}
	return array;
}

function ban (message, args) {
	if (message.member.hasPermission('BAN_MEMBERS')) {
		if (message.mentions.members.size > 0) {
			var users = message.mentions.members.first(message.mentions.members.size);
			if (users.size === 0) {
				ping(message);
				message.channel.send("Please specify user(s)!");
				return;
			} 
			for (arg of args) {
				if (arg.startsWith("<@")) {
					args = removeElement(arg, args);
				}
			}

			var banReason = args.length > 0 ? args.join(" ") : "No reason";
			for (user of users) {
				if (user.bannable) {user.ban({reason: banReason});}
				else {
					message.channel.send("Can not ban " + user.displayName);
				}
				
			}
			ping(message);
			message.channel.send("Successfully banned the users!");
		} else {
			ping(message);
			message.channel.send("Please specify a user!");
		}
	} else {
		ping(message);
		message.channel.send("You don't have the permission 'BAN_MEMBERS' to perform this command!");
	}
}

async function unban (message, args) {
	if (message.member.hasPermission('BAN_MEMBERS')) {
		let res = await message.guild.members.unban(args[0]);
		console.log(res);
	} else {
		ping(message);
		message.channel.send("You don't have the permission 'BAN_MEMBERS' to perform this command!");
	}
}

async function banlist (message, args) {
	if (message.member.hasPermission('BAN_MEMBERS')) {
		const banlistEmbed = new Discord.MessageEmbed()
		.setColor('#0DB877')
		.setTitle("Banlist for server " + message.guild.name)
		.setDescription("All banned users on this server")
		.setTimestamp();
		try {
			const banList = await message.guild.fetchBans();
			for (bannedUser of banList) {
				banlistEmbed.addField(bannedUser[1]["user"]["username"] + "#" + bannedUser[1]["user"]["discriminator"], bannedUser[1]["reason"]);
			}
			ping(message);
			message.channel.send(banlistEmbed);
		} catch(err) {
			console.trace();
			console.log(err);
		}
	} else {
		ping(message);
		message.channel.send("You don't have the permission 'BAN_MEMBERS' to perform this command!");
	}
}

mCommands = new Map();
//name, [function, usage, description, detailDescript, show in !help]
mCommands.set("ban", [ban, "ban [user]", "ban a user from the server", {"ban [user]": "Ban a user. Needs permission!", "ban [user] <Ban reason>": "Ban a user for reason. Needs permission!"}, true]);
mCommands.set("unban", [unban, "unban [user]", "unban a user from the server", {"unban [user]": "Unban a user. Needs permission!"}, true]);
mCommands.set("banlist", [banlist, "banlist", "shows all banned users from this server", {"banlist": "Shows all banned users from this server"}, true]);

module.exports.modCmds = mCommands;