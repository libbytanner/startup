import React from 'react';
import '../gallery.css';

import { RatingNotifier } from './newRatingNotifier.js'


export function Community() {

  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    RatingNotifier.addHandler(handleNewRating);
  
    return () => {
      RatingNotifier.removeHandler(handleNewRating)
    };
  }, [])

  React.useEffect(() => {
    fetch('/api/ratings')
      .then((response) => response.json())
      .then((ratings) => {
        setAlbums(ratings);
      });
  }, []);

  function handleNewRating(event) {
    setAlbums((prevAlbums) => {
      let newEvents = [event, ...prevAlbums];
      return newEvents;
    })
  }

  const recentRatings = albums.map((album) => (
      <div className="card h-100" key={album.id}>
        <img src={album.cover} id="cover" className="card-img-top" alt="album cover"/>
        <div className="card-body">
          <h5 className="card-title">{album.title}</h5>
          <p className="card-text">{album.artist}</p>
          <span className="icon"><img src="icon.svg" width="25px"/></span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Rating: {album.rating}/10</li>
          <li className="list-group-item">User: {album.user}</li>
          <li className="list-group-item">Date: {album.rating_date}</li>
          <li className="list-group-item button">
            <a href={album.url} className="btn btn-primary">View Album on Spotify</a>
          </li>
        </ul>
      </div>
    )
  )

  return (
    <main>
      <div className="container">
        {recentRatings.slice(0, 20)}
      </div>
    </main>
  );
}