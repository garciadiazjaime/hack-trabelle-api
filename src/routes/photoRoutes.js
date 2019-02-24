const express = require('express');

const photoModel = require('../model/photoModel')
const { savePhoto } = require('../services/photoService')
const config = require('../config')
const Canon = require('../utils/canon')

const router = express.Router()

router.get('/photo', async (req, res) => {
  const photos = await photoModel.find()
  res.send(photos)
})

router.get('/proxy/*', async (req, res) => {
  const route = req.params[0]
  console.log('route', route)
  const baseUrl = config.get('canon.url')
  const canon = new Canon({baseUrl})
  const result = await canon.run(route)

  if (result.status === 200) {
    return res.send(result.data)
  }
  
  res.send().status(500)
})

router.post('/photo', async (req, res) => {
  const { image, settings } = req.body
  const results = await savePhoto({ image, settings })
  res.send({ results })
})

module.exports = router
