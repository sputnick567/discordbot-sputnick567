const { Client } = require('pg');


const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
		rejectUnauthorized: false
		  }
	});

function init () {

	client.connect();
}



function getCommands(serverId) {
	try {
	let info = client.query("SELECT EXISTS (SELECT * FROM server_info WHERE serverId = " + serverId + ")");
	} catch (error) {
		console.log("error");
	}
	return info;
		
}

module.exports.init = init
module.exports.getCommands = getCommands
