const mysql = require('mysql');
const cTable = require('console.table');
const Options = require('./Assets/js/Options.js')

// Establish connection to  SQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '@Pplesauce97',
    database: 'cms_DB'
})

let options = new Options(connection);

connection.connect(err => {
    if (err) throw err;
    console.log(`CONNECTED ON THREAD ${connection.threadId}`);
    options.getOption();
})



