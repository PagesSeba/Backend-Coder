const { optionsMariaDB } = require('./options/config.js');
const knex = require('knex')(optionsMariaDB);

knex.schema.createTable('camiseta', table => {
	table.increments('id')
	table.string('equipo')
	table.string('descripcion')
	table.string('precio')
	table.string('url')
})
	.then(() => console.log('Table created'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())