import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Ratings } from './ratings/userRatings';
import { Community } from './community/community';
import { AuthState } from './login/authState';
import { Album } from './album/album';

export default function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username') || "");
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
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
                    {/* <form id="search" className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search album to rate" aria-label="Search"/>
                      <ul id="search-results"><li><NavLink to="album">Album1</NavLink></li></ul>
                    </form> */}
                    <NavLink className="nav-link" to="album">Album</NavLink>
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
              setUserName(username);
            }}
          />} exact />
          <Route path='/ratings' element={<Ratings />} />
          <Route path='/community' element={<Community />} />
          <Route path='/album' element={<Album username={username}/>} />
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
  </BrowserRouter>
  )
}

function NotFound() {
  return <main className='container-fluid'>404: Return to sender. Address unknown.</main>;
}