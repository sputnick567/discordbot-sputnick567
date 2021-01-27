const commands = Map();

function getArgs (message) {
	var args = message.content.split(" ");
	args.shift();
	return args;
}

function ping (message) {
	message.channel.send("<@!" + message.author.id + ">,");
}

function random(message) {
    const number = Math.random(); // generates a random number
    message.channel.send(number.toString()); // sends a message to the channel with the number
}

function invalidArgs (message) {
	message.channel.send("Invalid arguments! use !help <cmd> to get help to this command")
}


//name, [function, usage, description, show in !help]
commands.set("random", [random, "random", "returns a random number",{"random": "returns a random number between 0 and 1", "random <x>": "returns a random whole number between 1 and x"}, true]);
commands.set("help", [help, "help <cmdName>", "shows list of all commands", {"help":"returns list of all commands", "help <cmdName>": "gives info to cmd"}, true]);
commands.set("test", [test, "","test command","", false])


module.exports.commands = commands;