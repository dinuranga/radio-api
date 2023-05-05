const Channel = require('../models/channel');

exports.getChannelList = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createChannel = async (req, res) => {
  const channel = new Channel({
    name: req.body.name,
    streamUrl: req.body.streamUrl,
    logoUrl: req.body.logoUrl,
    language: req.body.language,
    genre: req.body.genre
  });

  try {
    const newChannel = await channel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (channel) {
      channel.name = req.body.name || channel.name;
      channel.streamUrl = req.body.streamUrl || channel.streamUrl;
      channel.logoUrl = req.body.logoUrl || channel.logoUrl;
      channel.language = req.body.language || channel.language; 
      channel.genre = req.nody.genre || channel.genre;

      const updatedChannel = await channel.save();
      res.json(updatedChannel);
    } else {
      res.status(404).json({ message: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (channel) {
      await channel.remove();
      res.json({ message: 'Channel deleted' });
    } else {
      res.status(404).json({ message: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

