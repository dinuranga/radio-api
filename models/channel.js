const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  streamUrl: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  }
},{ collection: 'channels' });


module.exports = mongoose.model('Channel', channelSchema);