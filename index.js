const Discord = require("discord.js"); // imports the discord library
//const fs = require("fs"); // imports the file io library

const client = new Discord.Client(); // creates a discord client
//const token = fs.readFileSync("token.txt").toString(); // gets your token from the file

const cmdMngr = require("./commands.js");
client.once("ready", () => { // prints "Ready!" to the console once the bot is online
	console.log("Ready!");
});




const commands = cmdMngr.commands;





function modhelp (message) {

}

function report (message) {

}







client.on("message", message => {
	const prefix = cmdMngr.db.getPrefix(message.guild.id);
    if (message.content[0] === prefix) {
        const command = message.content.split(" ")[0].substr(1);
         // gets the command name
        console.log("Command " + command + " was executed!");
        if (commands.has(command)) { // checks if the map contains the command
            commands.get(command)[0](message); // runs the command
        }  

        else {
        	message.channel.send("For help type " + prefix + "help");
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