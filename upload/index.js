const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

// req为node原生请求
const busboy = new Busboy({ headers: requestAnimationFrame.headers })


// 监听文件解释器事件
busboy.on('file', function(file, file, filename, encoding, mimetype) {
    console.log(`File [${filename}]: filename: ${filename}`)

    // 文件保存到特定路径
    file.pipe(fs.createWriteStream('./upload'))

    // 开始解析文件流
    file.on('data', function(data) {
        console.log(`File [${filename}] got ${data.length} bytes`)
    })

    // 解释文件结束
    file.on('end', function() {
        console.log(`File [${filename}] Finished`)
    })
})

// 监听请求中的字段
busboy.on('field', function(filename, val, fieldnameTruncated, valTruncated) {
    console.log(`Field [${fieldname}]: value: ${inspect(val)}`)
})

busboy.on('finish', function() {
    console.log('Done parsing form')
    res.writeHead(303, { Connection: 'close', Location: '/' })
    res.end()
})

req.pipe(busboy)
