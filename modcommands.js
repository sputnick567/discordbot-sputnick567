

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
				user.ban({reason: banReason});
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

function unban (message, args) {

}

mCommands = new Map();

mCommands.set("ban", [ban, "ban [user]", "ban a user from the server", {"ban [user]": "Ban a user. Needs mod rank!"}]);
mCommands.set("unban", [unban, "unban [user]", "unban a user from the server", {"unban [user]": "Unban a user. Needs mod rank!"}])


module.exports.modCmds = mCommands;