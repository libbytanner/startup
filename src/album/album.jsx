import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../forms.css';
import  { RatingNotifier} from '../community/newRatingNotifier.js'


export function Album(props) {
  const [albumTitle, setAlbumTitle] = React.useState('Title')
  const [imageUrl, setImageUrl] = React.useState('placeholder.png');
  const [artist, setArtist] = React.useState('Artist');
  const [year, setYear] = React.useState('Year');
  const [rating, updateRating] = React.useState('5');
  const [albumUrl, setAlbumUrl] = React.useState('spotify.com')
  const [albumId, setAlbumId] = React.useState('Key')
  const username = props.username;
  const navigate = useNavigate();
  const location = useLocation();
  const searchInput = location.state;
  const spotifyToken = props.token;

  React.useEffect(() => {
    // let searchURL = 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=album'
    //   fetch(searchURL, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json", 
    //       Authorization: "Bearer " + spotifyToken,
    //       mode: "no-cors",
    //     }
    //   })
    fetch('/search', {
      headers: { "searchInput": searchInput}
    })
      .then((response) => response.json())
      .then((album) => {
        setAlbumTitle(album.name);
        setImageUrl(album.images.url); 
        setArtist(album.artists[0].name);
        setYear(album.release_date);
        setAlbumUrl(album.external_urls.spotify);
        setAlbumId(Date.now())
      })
    // setAlbumTitle('Album')
    // setImageUrl('placeholder.png');
    // setArtist('Artist');
    // setYear('Year');
    // setAlbumUrl('https://open.spotify.com');
    // setAlbumId(Date.now())
  }, [])

  function onChange(e) {
    updateRating(e.target.value);
  }

  async function saveRating(rating) {
    const date = new Date().toLocaleDateString();
    const newRating = { title: albumTitle, id: albumId, cover: imageUrl, artist: artist, date: date, rating: rating, albumUrl: albumUrl, user: username };
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
      <img id="albumCover" src={imageUrl}/>
      <div id="albumInfo">
        <div>
          <h1>{albumTitle}</h1>
          <h3>{artist}</h3>
          <h3>{year}</h3>
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