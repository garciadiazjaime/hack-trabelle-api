const mongoose = require('mongoose')

mongoose.Promise = global.Promise

function openDatabase(dbUrl) {
  return mongoose.connect(dbUrl, { useMongoClient: true })
}

module.exports.openDatabase = openDatabase
