const express = require('express');
const graphqlHTTP = require('express-graphql')

const photoSchema = require('../graphql/schema/photoSchema')
const { savePhoto } = require('../services/photoService')

const router = express.Router()

router.get('/photo', graphqlHTTP(() => ({
  schema: photoSchema
})))

router.post('/photo', async (req, res) => {
  const { photo } = req.body
  const promises = events.map(savePhoto)
  Promise.all(promises)
    .then(results => {
      const data = results && results.filter(item => item).length || 0
      res.send({
        data
      })
    })
    .catch(error => {
      res.send(error).status(500)
    })
})

module.exports = router
