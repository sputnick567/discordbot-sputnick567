const { Client } = require('pg');
const defaultPrefix = "!";
const defaultCommands = ["test", "help", "random"];
const defaultWelcomeMessage = "<name>, welcome to the server!";

String.prototype.format = function() {
	a = this;
	for (k in arguments) {
		a = a.replace("{" + k + "}", arguments[k])
	}
	return a
}


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
			console.log("Result of CREATE SCHEMA servers");
			console.log(res);
		}
	});
	//client.query("DROP TABLE server_info");
	client.query("CREATE TABLE IF NOT EXISTS servers.server_info (serverID int, commandPrefix varchar(10), welcomeMessage varchar(50), commands varchar(20480))", (err, res) => {
	
		//function with param err and res 
		if (err) {
			someError();
			console.trace();
		} else {

		console.log("Result:");
		console.log(JSON.stringify(res));
		}
	});

}

function serverExists (serverId) {
	client.query("SELECT * FROM servers.server_info WHERE serverId = " + serverId + ";", (err, res) => {
		if (err) {
			someError();
			console.trace();
			console.log(err);
			return false;
		} else {
			if (res.rows.length != 0) {
				console.log("Server with id " + serverId + "exists!");
				return true;
			} else {
				console.log("Server with id " + serverId + "does not exist!");
				addServer(serverId);
				return false;
			}
		}
	});
}


function getCommands(serverId) {
	client.query("SELECT commands FROM servers.server_info WHERE serverID = " + serverId, (err, res) => {
		if (err) {
			someError();
			console.trace();
			console.log(err);
			return null
		} else {
			console.log("Got commands for " + serverId);
			console.log(res.rows);
			return JSON.parse(res.rows[0]);
		}
	});

}

function getPrefix (serverId) {
	client.query("SELECT commandPrefix FROM servers.server_info WHERE serverID = " + serverId + ";", (err, res) => {
		if (err) {
			someError();
			console.trace();
			console.log(err);
			return null;
		} else if (serverExists(serverId)) {
			console.log("Got prefix")
			console.log(res.rows);
			return res.rows[0];
		} else {
			return null;
		}
	});

}

function someError() {
	console.log("Some error occured!");
}

function addServer (serverId) {
	console.log("Adding server with id " + serverId);							
	client.query("INSERT INTO servers.server_info VALUES ($1, $2, $3, $4)", [serverId, defaultPrefix, defaultWelcomeMessage, defaultCommands], (err, res) => {
															//serverID int, commandPrefix varchar(10), welcomeMessage varchar(50), commands varchar(20480)
		if (err) {
			someError();
			console.trace();
			console.log(err);
			return false;
		} else {
			console.log("succesfully added server " + serverId);
			console.log(res);
			return true;
		}
	});
} 

module.exports.init = init;
module.exports.getCommands = getCommands;
module.exports.getPrefix = getPrefix;
