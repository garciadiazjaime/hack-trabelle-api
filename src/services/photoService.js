const PhotoModel = require('../model/photoModel')

async function savePhoto(photo) {
  return new PhotoModel(photo).save()
}

module.exports.savePhoto = savePhoto
