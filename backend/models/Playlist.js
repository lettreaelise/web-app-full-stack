const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [String]
});

module.exports = mongoose.model('Playlist', playlistSchema);
