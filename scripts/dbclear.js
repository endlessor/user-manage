var mysql    = require('mysql2');

const CONFIG = require('../config/config');

const connectionInfo = {
  'host': CONFIG.db_host,
  'user': CONFIG.db_user,
  'password': CONFIG.db_password
}
// Script for dropping the entire database
var conn = mysql.createConnection(connectionInfo);

conn.query('DROP DATABASE ' + dbconfig.database);

console.log('Success! Database cleared.');
conn.end();
