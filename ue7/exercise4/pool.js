const { Pool } = require('pg');

let client;

let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')

let pool= new Pool({
	host: cfg.database.host,
	user: cfg.database.user,
	password: cfg.database.password,
	database: cfg.database.db
	});

module.exports = pool;