const promises = require('fs/promises')
const fs = require("fs")

let temp
let text = ""
promises.mkdir("./06-build-page/project-dist", {recursive: true})
let index = fs.createWriteStream("./06-build-page/project-dist/index.html")
let template = fs.createReadStream("./06-build-page/template.html")

template.on('data', data => {
    text += data.toString()
 let components = promises.readdir("./06-build-page/components",
      {withFileTypes: true})

    components.then(files => {
    files.forEach(file => {
          temp = fs.createReadStream(`./06-build-page/components/${file.name}`, 'utf-8')
          temp.on('data',chunk => {
              text = text.replace(`{{${file.name.slice(0, -5)}}}`, `${chunk}`)
          })
    })
  temp.on('end', () => index.write(text))
    })
})

const css = fs.createWriteStream('./06-build-page/project-dist/style.css')
let styles = promises.readdir("./06-build-page/styles",
      {withFileTypes: true})

    styles.then(files => {
        files.forEach(file => {
            temp = fs.createReadStream(`./06-build-page/styles/${file.name}`, 'utf-8')
            temp.on('data', chunk => {
                css.write(chunk)
            })
        })
    })

function copyDir(src, dst, temp='') {

    src = src + temp
    dst = dst + temp

    promises.mkdir(dst, {recursive: true})
    let assets = promises.readdir(src,
        {withFileTypes: true})
    assets.then(files => {
            files.forEach(file => {

                if (file.isDirectory()) {
                    temp = '/' + file.name
                    copyDir(src, dst, temp)
                }
                else {
                    promises.copyFile(src + '/' + `${file.name}`,
                    dst + '/' + `${file.name}`)
                }
            })
        }
    )
    assets.then( () => {

        let filesCopy = promises.readdir(dst,
            {withFileTypes: true})
        filesCopy.then(files => {
                files.forEach(file => {
                    fs.stat(src + '/' + `${file.name}`,
                        (err) => {
                            if (err) {
                                promises.rm(dst + '/' + `${file.name}`)
                            }
                        })
                })
            }
        )
    }
 )
}

console.log("Procedure completed")
copyDir("./06-build-page/assets", "./06-build-page/project-dist/assets")