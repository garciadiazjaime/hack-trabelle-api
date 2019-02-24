const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  url: String,
  conf: Object,
  gps: Object,
});

const GrpnEvent = mongoose.model('photo', PhotoSchema);

module.exports = GrpnEvent;
