const request = require('request')
const fs = require('fs')

const config = require('../config')
const Canon = require('./canon')

async function downloadImage(image) {
  const prefix = `${process.cwd()}/static/images/`
  const filename = image.split('/').pop()
  return new Promise((resolve) => {
    const filePath = `${prefix}${filename}`
    if (!fs.existsSync(filePath)) {
      console.log(`saving ${filePath}`)
      request(image, {encoding: 'binary'}, (error, response, body) => {
          fs.writeFile(filePath, body, 'binary', () => {
            console.log(`saved: ${filename}`)
            resolve()
          });
      });
    }
  })
}

async function main() {
  const baseUrl = config.get('canon.url')
  const canon = new Canon({baseUrl})
  const result = await canon.run('/proxy/ccapi/ver100/contents/sd/100CANON/')
  if (result.status === 200) {
    const images = result.data.url
    await downloadImage(images.pop())      

    console.log('\n...done :)\n')
  }
}


main()
