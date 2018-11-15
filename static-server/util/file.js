const fs = require('fs')

function file ( file ) {
    let content = fs.readFileSync(filePath, 'binary')
    return content
}

module.exports = file