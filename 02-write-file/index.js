const {stdin} = process
const fs = require('fs')
const file = fs.createWriteStream("./02-write-file/text.txt")

console.log("Заходи дорогой!")

process.on('SIGINT', () => {
    process.exit()
  })

stdin.on('data', data => {
    const temp = data.toString();
    if (temp.slice(0, 4) === 'exit') {
     process.exit()
  }
    else file.write(temp)
})

process.on('exit', () => {
    console.log("Отдохни дорогой!")
  })
