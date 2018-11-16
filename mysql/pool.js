const mysql = require('mysql')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'shiyong001',
    database: 'koa2_db'
})

pool.getConnection(function(err, conneection) {
    conneection.query('SELECT * FROM my_table', (error, results, fields) => {
        

        conneection.release()

        if (error) throw error
        
    })
})