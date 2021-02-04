const { Client } = require('pg');
const defaultPrefix = "!";
const defaultCommands = ['test', 'help', 'random'];
const defaultWelcomeMessage = '<name><c> welcome to the server!';
//<c> = ,
var qResult = false;

const cmdPref = "commandprefix";
const cmds = "commands";

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
	rejectUnauthorized: false
	  }
});

function init () {
	
	client.connect();
	//shema = wie neuer ordner
	client.query("CREATE SCHEMA IF NOT EXISTS servers", (err, res) => {
		if (err) {
			someError()
			console.trace();
			console.log(err);
			
		} else {
			//console.log("Result of CREATE SCHEMA servers");
			//console.log(res);

		}
	});
	//client.query("DROP TABLE servers.server_info");
	client.query("CREATE TABLE IF NOT EXISTS servers.server_info (serverID varchar(30), commandPrefix varchar(10), welcomeMessage varchar(50), commands varchar(20480))", (err, res) => {
	
		//function with param err and res
		if (err) {
			someError();
			console.trace();
		} else {

		//console.log("Result:");
		//console.log(JSON.stringify(res));
		}
	});

}

async function serverExists (serverId) {
	console.log("Checking if server exists: " + serverId);
	let res = await client.query("SELECT * FROM servers.server_info WHERE serverId = '" + serverId + "';");
	console.log(res.rows);
	if (res.rows.length === 0) {
		console.log("Server doesn't exist!");
		return false;
	} else {
		console.log("Server exists!");
		return true;
	}
}


async function getCommands(serverId) {
	let res = await client.query("SELECT commands FROM servers.server_info WHERE serverID = " + serverId);
	if (res.rows.length === 0) {
		if (serverExists(serverId)) {
			return null;
		} else {
			return defaultCommands;
		}
	} else {
		return JSON.parse(res.rows[0][cmds]);
	}

}

async function getPrefix (serverId) {
	
	let res = await client.query("SELECT commandPrefix FROM servers.server_info WHERE serverID = '" + serverId + "';");
	console.log(res.rows);
	if (res.rows.length === 0) {
		if (serverExists(serverId)) {
			console.log("It thinks the server does exist!");
			return null
		} else {
			addServer(serverId);
			console.log("Returning default prefix!");
			return defaultPrefix;
		}
	} else {
		return res.rows[0][cmdPref];
	}

}

function someError() {
	console.log("Some error occured!");
}

async function addServer (serverId) {
	/*client.query("SELECT pg_is_in_recovery();", (err, res) => {
		if (err) {
			someError();
			console.trace();
			console.log(err);
			return false;
		} else {
			console.log(res);
		}
	});*/
	console.log("Adding server with id " + serverId);
	let qQuery = "INSERT INTO servers.server_info VALUES ($1, $2, $3, $4);"
	let val = [serverId, defaultPrefix, defaultWelcomeMessage, JSON.stringify(defaultCommands)];
	//let test = "INSERT INTO servers.server_info VALUES ($1, $2, $3, '["test", "help", "random"]');"
	//console.log(test);
	await client.query(qQuery, val);
} 


module.exports.init = init;
module.exports.getCommands = getCommands;
module.exports.getPrefix = getPrefix;
module.exports.serverExists = serverExists;
module.exports.addServer = addServer;