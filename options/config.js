const optionsSQLite3 = {
	client: 'sqlite3',
	connection: {
		filename: './db/messages.sqlite'
	},
	useNullAsDefault: true
}

const optionsMariaDB = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'testcoder'
	}
}

module.exports = { optionsSQLite3, optionsMariaDB };