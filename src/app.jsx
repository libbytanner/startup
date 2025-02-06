import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className='body'>
    <header class="sticky-top">
        <nav class="navbar navbar-dark navbar-expand-md">
          <div class="container-fluid">
            <a class="navbar-brand" href="index.html">SoundScope</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="userRatings.html">My Ratings</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="recent.html">Recent</a>
                </li>
                <li class="nav-item">
                  <form id="search" class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search album to rate" aria-label="Search"/>
                    <ul id="search-results"></ul>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </header>
        <main>
			app components go here
        </main>
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
  </div>;
}