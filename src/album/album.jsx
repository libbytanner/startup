import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../forms.css';
import  { RatingNotifier} from '../community/newRatingNotifier.js'


export function Album(props) {
  const [rating, updateRating] = React.useState('5');
  const username = props.username;
  const navigate = useNavigate();
  const location = useLocation();
  const album = location.state;


  function onChange(e) {
    updateRating(e.target.value);
  }

  async function saveRating(rating) {
    const date = new Date().toLocaleDateString();
    const newRating = { 
      title: album.title, 
      id: album.id, 
      cover: album.cover, 
      artist: album.artist, 
      release_date: album.year,
      rating: rating, 
      rating_date: date, 
      url: album.url, 
      user: username
    };
    console.log(newRating)
      await fetch('/api/rating', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRating),
      });
    RatingNotifier.broadcastEvent(newRating);
    navigate('/ratings');
  }

  return (
    <main>
      <img id="albumCover" src={album.cover}/>
      <div id="albumInfo">
        <div>
          <h1>{album.title}</h1>
          <h3>{album.artist}</h3>
          <h3>{album.year}</h3>
        </div>
        <div id="userInput" to="albums" onSubmit={(e) => e.preventDefault()}>
          <div id="albumslider">
            <label htmlFor="rating">Rating</label>
            <input type="range" className="form-range" min="1" max="10" step="0.5" name="varRange" onChange={onChange}></input>
              <output id="rangeOutput" htmlFor="rating">{rating}/10</output>
          </div>
          <button id="submit" type="button" className="btn btn-primary" onClick={() => saveRating(rating)}>Submit Rating</button>
        </div>
      </div>
    </main>
  );
}