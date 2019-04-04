//database sqlite3 uses knex
const knex = require('knex');
//knex configuration
const knexConfig = require('../knexfile.js');
//export knex configuration
module.exports = knex(knexConfig.development);
