const { Client } = require('pg');
const defaultPrefix = "!";
const defaultCommands = ['test', 'help', 'random'];
const defaultWelcomeMessage = '<name><c> welcome to the server!';
//<c> = ,
var qResult = false;


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
	//client.query("DROP TABLE servers.server_info");
	client.query("CREATE TABLE IF NOT EXISTS servers.server_info (serverID varchar(30), commandPrefix varchar(10), welcomeMessage varchar(50), commands varchar(20480))", (err, res) => {
	
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
	/*console.log("Checking for columns!");
	client.query("SELECT * FROM information_schema.columns WHERE table_schema = 'servers'AND table_name = 'server_info';", (err ,res) =>  {
		if (err) {
			someError();
			console.trace();
			console.log(err);
			return false;
		} else {
			if (res.rows.length === 0) {
				return false;
			} else {
				console.log("SCHEMA exists")
			}
		}
	})*/
	qResult = false
	/*
	client.query("SELECT * FROM servers.server_info WHERE serverId = '" + serverId + "';", (err, res) => {
		console.log("Inline function was called serverExists");
		if (err) {
			someError();
			console.trace();
			console.log(err);
			qResult = false;
		} else {
			if (res.rows.length !== 0) {
				console.log("Server with id " + serverId + " exists!");
				console.log("1 qResult = " + qResult);
				qResult = true;
				console.log("2 qResult = " + qResult);
			} else {
				console.log("Server with id " + serverId + " does not exist!");
				addServer(serverId);
				qResult = false;
			}
		}
	});
	*/
	console.log(await client.query("SELECT * FROM servers.server_info WHERE serverId = '" + serverId + "';"));
	console.log("returning server exists:");
	console.log(qResult);
	return qResult;
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
	console.log("serching for prefix!");
	console.log(serverExists(serverId));
	qResult = null;
	client.query("SELECT commandPrefix FROM servers.server_info WHERE serverID = '" + serverId + "';", (err, res) => {
		if (err) {
			someError();
			console.trace();
			console.log(err);
			qResult = null;
		} else if (serverExists(serverId)) {
			console.log("Got prefix")
			console.log(res.rows);
			qResult = res.rows[0].commandPrefix;
		} else {
			qResult = null;
		}
	});
	return qResult;

}

function someError() {
	console.log("Some error occured!");
}

function addServer (serverId) {
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
	console.log(qQuery);
	//console.log(test);
	client.query(qQuery, val, (err, res) => {
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
