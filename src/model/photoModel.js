const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  image: String,
  settings: Object,
  gps: Object,
});

const PhotoModel = mongoose.model('photo', PhotoSchema);

module.exports = PhotoModel;
