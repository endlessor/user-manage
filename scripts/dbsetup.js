var mysql    = require('mysql2');

const CONFIG = require('../config/config');

const connectionInfo = {
  'host': CONFIG.db_host,
  'user': CONFIG.db_user,
  'password': CONFIG.db_password
}
// Script for setting up database and tables
var conn = mysql.createConnection(connectionInfo);

conn.query('CREATE DATABASE ' + CONFIG.db_name);

console.log('Success! Database created.');
conn.end();
