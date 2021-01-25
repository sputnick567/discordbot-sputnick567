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
	client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  	if (err) throw err;
  	for (let row of res.rows) {
    	console.log(JSON.stringify(row));
  	}
  client.end();
});
	} catch (error) {
		console.log("error");
	}
	return info;
		
}

module.exports.init = init
module.exports.getCommands = getCommands
