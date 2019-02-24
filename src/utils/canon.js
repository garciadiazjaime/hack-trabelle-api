const axios = require('axios')

class Canon {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  run(route) {
    return axios.get(`${this.baseUrl}/${route}`)
  }
}

module.exports = Canon
