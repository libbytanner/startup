import React from 'react';
import '../gallery.css';

import { RatingNotifier} from './newRatingNotifier.js'


export function Community() {

  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    RatingNotifier.addHandler(handleNewRating);
  
    return () => {
      RatingNotifier.removeHandler(handleNewRating)
    };
  }, [])

  React.useEffect(() => {
    const albumsText = localStorage.getItem('communityAlbums')
    if (albumsText) {
      setAlbums(JSON.parse(albumsText))
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('communityAlbums', JSON.stringify(albums))
  })

  function handleNewRating(event) {
    setAlbums((prevAlbums) => {
      let newEvents = [event, ...prevAlbums];
      if (newEvents.length > 20) {
        newEvents = newEvents.slice(0, 20);
      }
      return newEvents;
    })
  }

  const recentRatings = [];
  for (const[i,album] of albums.entries()) {
    recentRatings.push(
      <div className="card h-100" key={album.id}>
        <img src="placeholder.png" className="card-img-top" alt="album cover"/>
        <div className="card-body">
          <h5 className="card-title">{album.title}</h5>
          <p className="card-text">{album.artist}</p>
          <span className="icon"><img src="icon.svg" width="25px"/></span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Rating: {album.rating}</li>
          <li className="list-group-item">User: {album.user}</li>
          <li className="list-group-item">Date: {album.date}</li>
          <li className="list-group-item button">
            <a href="https://open.spotify.com" className="btn btn-primary">View Album on Spotify</a>
          </li>
        </ul>
      </div>
    )
    }

  return (
    <main>
      <div className="container">
        {recentRatings}
      </div>
    </main>
  );
}