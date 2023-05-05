const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

router.get('/channels', channelController.getChannelList);
router.post('/channels', channelController.createChannel);
router.put('/channels/:id', channelController.updateChannel);
router.delete('/channels/:id', channelController.deleteChannel);

module.exports = router;