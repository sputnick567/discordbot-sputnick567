const { Client } = require('pg');


const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
		rejectUnauthorized: false
		  }
	});

function init () {
	
	client.connect();
	//shema = wie neuer ordner
	client.query("CREATE SCHEMA servers", (err, res) => {
		if (err) {
			console.log("Some error at db.js:15");
			
		} else {
			console.log("Result of CREATE SCHEMA servers");
			console.log(res);
		}
	});
	//client.query("DROP TABLE server_info");
	/*client.query("CREATE TABLE servers.server_info (serverID int, commandPrefix varchar(10), welcomeMessage varchar(50))", (err, res) => {
	
		//function with param err and res 
		if (err) {
			console.log("Error " + err);
		}
		console.log("Result:");
		console.log(JSON.stringify(res));
	});*/

}


function getCommands(serverId) {
	try {
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
}

module.exports.init = init
module.exports.getCommands = getCommands
