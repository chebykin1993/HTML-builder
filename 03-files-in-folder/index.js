const promises = require('fs/promises')
const files = promises.readdir("./03-files-in-folder/secret-folder", {withFileTypes: true});
const fs = require("fs")
const path = require("path")

files.then(files => {
  for (let file of files) {
      if (file.isFile()) {
          let name = file.name
          let ext = path.extname(`./03-files-in-folder/secret-folder/${name}`)
          fs.stat(`./03-files-in-folder/secret-folder/${name}`,
              (err, file) =>
                  console.log(name.slice(0, name.indexOf("."))
                      + " - " + ext.slice(1) + " - " + file.size + 'b'))
      }
  }
})

