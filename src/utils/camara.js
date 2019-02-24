const axios = require('axios')
const request = require('request')
const fs = require('fs')

class ServiceClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getPictures() {
    return axios.get(`${this.baseUrl}/ccapi/ver100/contents/sd/100CANON/`)
  }

  getPicture() {
    return axios.get('http://192.168.1.2:8080/ccapi/ver100/contents/sd/100CANON/IMG_0001.JPG')
  }
}

async function downloadImage(image) {
  const prefix = './static/'
  const filename = image.split('/').pop()
  return new Promise((resolve) => {
    if (!fs.existsSync(`${prefix}${filename}`)) {
      console.log(`saving: ${filename}`)
      request(image, {encoding: 'binary'}, (error, response, body) => {
          fs.writeFile(`${prefix}${filename}`, body, 'binary', () => {
            console.log(`saved: ${filename}`)
            resolve()
          });
      });
    }
  })
}

async function main() {
  const baseUrl = 'http://192.168.1.2:8080'
  const serviceClient = new ServiceClient(baseUrl)
  const result = await serviceClient.getPictures()
  if (result.status === 200) {
    const images = result.data.url
    console.log(`saving ${images.length} files...\n`)
    for(let i=0; i < images.length; i ++) {
      await downloadImage(images[i])      
    }

    console.log('\n...done :)]n')
  }
}


main()
