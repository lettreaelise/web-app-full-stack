import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get('/playlists');
        setPlaylists(response.data);
      } catch (err) {
        setError('Erro ao carregar as playlists.');
      }
    };

    fetchPlaylists();
  }, []);

  const handleAddPlaylist = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/playlists', {
        title,
        description,
        songs: [],
      });
      setPlaylists([...playlists, response.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Erro ao adicionar playlist.');
    }
  };

  return (
    <div>
      <h2>Minhas Playlists</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddPlaylist}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            className="form-control"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Adicionar Playlist</button>
      </form>

      <ul className="list-group mt-4">
        {playlists.map((playlist) => (
          <li key={playlist._id} className="list-group-item">
            <h5>{playlist.title}</h5>
            <p>{playlist.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
