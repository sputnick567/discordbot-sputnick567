


const client;

function init () {
	const { Client } = require('pg');
	client = new Client({
		connectionString: conn,
		ssl: {
		rejectUnauthorized: false
		  }
	});

	client.connect();
}



function getCommands(serverId) {
	let info = client.query("SELECT EXISTS (SELECT * FROM server_info WHERE serverId = " + serverId);
	return info;
		
}

module.exports.init = init
module.exports.getCommands = getCommands
