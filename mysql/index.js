const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'shiyong001',
    database: 'koa2_db'
})

connection.query('SELECT * FROM _mysql_session_store', (error, result, fields) => {
    if (error)  throw error

    connection.release()
})

