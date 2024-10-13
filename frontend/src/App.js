import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Playlists from './components/Playlists';
import Register from './components/Register';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));


  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Meu App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Registrar</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/playlists">Minhas Playlists</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            { }
            <Route path="/" element={isLoggedIn ? <Navigate to="/playlists" /> : <Navigate to="/login" />} />

            { }
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            { }
            <Route path="/register" element={<Register />} />

            { }
            <Route path="/playlists" element={isLoggedIn ? <Playlists /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
