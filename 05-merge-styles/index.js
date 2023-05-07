const promises = require('fs/promises')
const path = require('path')
const fs = require("fs")

let stream = null
const bundle = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css')
let styles = promises.readdir("./05-merge-styles/styles", {withFileTypes: true})
styles.then(files => files.forEach(file => {
    if (path.extname(`./05-merge-styles/styles/${file.name}`) === ".css") {
        stream = fs.createReadStream(`./05-merge-styles/styles/${file.name}`, 'utf-8')
        stream.on('data', data => bundle.write(data))
    }

}))
console.log("Bundle created")