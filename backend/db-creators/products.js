import { mariadbConfig } from '../config/config.js';
import knex from 'knex';

const database = knex(mariadbConfig);

database.schema.createTable('products', table => {
	table.increments('id')
	table.string('name')
	table.string('price')
	table.string('thumbnail')
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err); throw err })
.finally(() => database.destroy())