const { Sequelize } = require('sequelize');
//LOCALHOST
DB_NAME="bwater";
DB_USER="root";
DB_PASS=null;
DB_HOST="localhost";
DB_PORT=3306;

// BASE DE DATOS WEB
// DB_NAME="javierg_bwater";
// DB_USER="javierg_bwater";
// DB_PASS="eaf1qbU6T6LV";
// DB_HOST="localhost";
// DB_PORT=3306;
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,
	{
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'mysql',
		logging: false
		//timezone: 'America/Lima'
	});

module.exports = db;


