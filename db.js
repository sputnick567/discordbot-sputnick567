const { Client } = require('pg');
const defaultPrefix = "!";
const defaultCommands = ["test", "help", "random"];

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
			console.log("Some error at db.js:15");
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
			console.log("Error " + err);
		} else {

		console.log("Result:");
		console.log(JSON.stringify(res));
		}
	});

}

function serverExists (serverId) {
	client.query("SELECT * FROM servers.server_info WHERE serverId = " + serverId + ";", (err, res) => {
		if (err) {
			console.log("error at db.js:42");
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
	/*try {
		client.query("INSERT INTO servers.server_info VALUES (" + serverId + ",'!', '<name> welcome to the server'", (err, res) => {
			if (err) {
				console.log("error wierdo");
			}
			else {
				for (let row of res.rows) {
			    	console.log(JSON.stringify(row));
			  	}
			}
		});
		cleint.query("SELECT commandPrefix FROM servers.server_info WHERE serverId = " + serverId, (err, res) => {
			if (err) throw err;
			console.log("results of query");
			for (let row of res.rows) {
				
				console.log(JSON.stringify(row));
			}
		});
		client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
	  	if (err) {
	  		console.log("Some weired error");
	  	}
	  	console.log("ROWS:")
	  	for (let row of res.rows) {
	    	console.log(JSON.stringify(row));
	  	}
		});
		
	} catch (error) {
		console.log("Some Error occured");
	}
	*/
}

function getPrefix (serverId) {
	client.query("SELECT commandPrefix FROM servers.server_info WHERE serverID = " + serverId + ";", (err, res) => {
		if (err) {
			console.log("error at db.js:77");
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

function addServer (serverId) {
	console.log("Adding server with id " + serverId);
	client.query('INSERT INTO servers.server_info VALUES (' + serverId + ', ' + defaultPrefix + ', "", '+ defaultCommands, (err, res) => {
		if (err) {
			console.log("Error at db.js:93");
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
