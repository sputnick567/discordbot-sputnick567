function mod (message, args) {
	//mod add <rank>
	//mod add player
	//mod remove
	//mod reset
}



function ban (message, args) {

}

function unban (message, args) {

}

mCommands = new Map();

mCommands.set("ban", [ban, "ban [user]", "ban a user from the server", {"ban [user]": "Ban a user. Needs mod rank!"}]);
mCommands.set("unban", [unban, "unban [user]", "unban a user from the server", {"unban [user]": "Unban a user. Needs mod rank!"}])


module.exports.modCommands = mCommands;