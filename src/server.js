const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { openDatabase } = require('./services/databaseService');
const routes = require('./routes');
const config = require('./config');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

openDatabase(config.get('db.url'))
  .then(() => {
    app.use('/', routes)
    app.listen(config.get('port'), config.get('ip'), () => console.log(`Running on ${config.get('ip')}:${config.get('port')}`))
  })
  .catch(console.log)
