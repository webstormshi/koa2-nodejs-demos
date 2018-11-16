const { query } = require('./async_db')

async function selectAllData() {
    let sql = 'SELECT * FROM _mysql_session_store'
    let dataList = await query( sql )
    return dataList
}

async function getData() {
    let dataList = await selectAllData()
    console.log(dataList)
}

getData()