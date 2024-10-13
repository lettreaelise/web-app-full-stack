const express = require('express');
const router = express.Router();
const { createPlaylist, getPlaylists, updatePlaylist, deletePlaylist } = require('../controllers/playlistController');
const { authMiddleware } = require('../controllers/authController');


router.post('/', authMiddleware, createPlaylist);
router.get('/', authMiddleware, getPlaylists);
router.patch('/:id', authMiddleware, updatePlaylist);
router.delete('/:id', authMiddleware, deletePlaylist);

module.exports = router;
