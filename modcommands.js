



function ban (message, args) {
	if (message.member.hasPermission('BAN_MEMBERS')) {
		console.log(message.mentions.users);
		console.log(args);
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