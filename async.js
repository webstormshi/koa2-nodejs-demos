
function getSyncTime() {
    return new Promise((resolve, reject) => {
        try {
            let startTime = new Date().getTime()
            setTimeout(() => {
                let endTime = new Date().getTime()
                let data = endTime - startTime
                resolve(data)
            }, 1000);   
        } catch (error) {
            reject(error)
        }
    })
}

async function getData() {
    let time = await getSyncTime()
    console.log('time', time)
    let data = `endTime - startTime = ${time}`
    return data
}

getData()