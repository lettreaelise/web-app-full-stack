const Playlist = require('../models/Playlist');
const User = require('../models/User');

// Criar uma playlist
exports.createPlaylist = async (req, res) => {
    const { title, description, songs } = req.body;

    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

        const playlist = new Playlist({ title, description, songs, user: req.user });
        await playlist.save();

        user.playlists.push(playlist._id);
        await user.save();

        res.json(playlist);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

// Listar playlists do usuário
exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user }).populate('user', 'name');
        res.json(playlists);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};


// Atualizar um atributo da playlist (atualização parcial)
exports.updatePlaylist = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        
        const playlist = await Playlist.findByIdAndUpdate(id, updates, { new: true });

        if (!playlist) return res.status(404).json({ msg: 'Playlist não encontrada' });

        res.json(playlist);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};


// Excluir uma playlist
exports.deletePlaylist = async (req, res) => {
    const { id } = req.params;

    try {
        const playlist = await Playlist.findByIdAndDelete(id);

        if (!playlist) return res.status(404).json({ msg: 'Playlist não encontrada' });

        res.json({ msg: 'Playlist removida' });
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};
