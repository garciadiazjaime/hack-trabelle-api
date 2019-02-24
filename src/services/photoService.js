const EventModel = require('../model/photoModel')

async function savePhoto(event) {
  const query = {uuid: event.uuid}
  const result = await EventModel.findOne(query)
  if (!result) {
    return new EventModel(event).save()
  }
  return null
}

module.exports.savePhoto = savePhoto
