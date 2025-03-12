import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Ratings } from './ratings/userRatings';
import { Community } from './community/community';
import { AuthState } from './login/authState';
import { Album } from './album/album';

export default function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username') || "");
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [searchInput, setSearchInput] = React.useState('');
  const [spotifyToken, setToken] = React.useState('');
  const navigate = useNavigate()

  React.useEffect(() => {
    setUsername(username)
  })

  React.useEffect(() => {
    const fetchToken = async() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
    })
      .then((result) => result.json())
      .then((data) => {setToken(data.access_token)})
    }

    fetchToken();
  }, []);

  async function search(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log("Search function triggered, searchInput:", searchInput);

      let response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=album&limit=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
          Authorization: "Bearer " + spotifyToken,
        }
      });
      console.log("Response recieved:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

      const data = await response.json();
      console.log("Fetched Data:", data);

      const album = data.albums.items[0];
      console.log("Album Result:", album)
      
        if (!album) {
          console.log("No Album!!!! :((")
        }
        const artist = album.artists[0].name;
        const title = album.name;
        const id = Date.now();
        const cover = album.images[0].url;
        const year = album.release_date;

        const albumPckg = {artists: artist, title: title, id: id, cover: cover, year: year};
        console.log("Navigating to /album with data:", albumPckg);

        navigate('/album', {state: albumPckg});
      }
    }

  return (
    <div className='app'>
      <header className="sticky-top">
        <nav className="navbar navbar-dark navbar-expand-md">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="">SoundScope</NavLink>
            {authState === AuthState.Authenticated && (
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
            {authState === AuthState.Authenticated && (
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="ratings">My Ratings</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="community">Community</NavLink>
                  </li>
                  <li className="nav-item">
                    <form id="search" className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search album to rate" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} onKeyDown={search}/>
                    </form>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login 
            username={username}
            authState={authState}
            onAuthChange={(username, authState) => {
              setAuthState(authState);
              setUsername(username);
            }}
          />} exact />
          <Route path='/ratings' element={<Ratings username={username}/>} />
          <Route path='/community' element={<Community />} />
          <Route path='/album' element={<Album username={username} token={spotifyToken}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
			<div>
				<p>Author: Libby Tanner</p>
				<a href="https://github.com/libbytanner/startup">Startup Github Repository</a>
			</div>
			<div id="spotifyCredit">
				<p>Made with</p>
				<img src="fullLogo.svg" width="150px"/>
			</div>
		</footer>
  </div>
  )
}

function NotFound() {
  return <main className='container-fluid'>404: Return to sender. Address unknown.</main>;
}