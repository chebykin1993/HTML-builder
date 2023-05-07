const promises = require('fs/promises')
const fs = require("fs")

function copyDir() {

  promises.mkdir("./04-copy-directory/files-copy", {recursive: true})
  let files = promises.readdir("./04-copy-directory/files",
      {withFileTypes: true})
  files.then(files => {
    files.forEach(file => {
          promises.copyFile(`./04-copy-directory/files/${file.name}`,
              `./04-copy-directory/files-copy/${file.name}`)
        })
      }
  )
    let filesCopy = promises.readdir("./04-copy-directory/files-copy",
      {withFileTypes: true})
  filesCopy.then(files => {
    files.forEach(file => {
         fs.stat(`./04-copy-directory/files/${file.name}`,
        (err) => {
             if (err) {promises.rm(`./04-copy-directory/files-copy/${file.name}`)}
          })
        })
      }
  )
    console.log("Procedure completed")
}
copyDir()
