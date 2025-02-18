import React from 'react';
import '../forms.css'


export function Album() {
  const [albumTitle, setAlbumTitle] = React.useState('Title')
  const [imageUrl, setImageUrl] = React.useState('');
  const [artist, setArtist] = React.useState('Artist');
  const [year, setYear] = React.useState('Year');
  const [rating, updateRating] = React.useState('5');
  const [albumUrl, setAlbumUrl] = React.useState('')

  React.useEffect(() => {
    setAlbumTitle('Album')
    setImageUrl('placeholder.png');
    setArtist('Artist');
    setYear('Year');
  }, [])

  function onChange(e) {
    updateRating(e.target.value);
  }

  async function saveRating(rating) {
    const date = new Date().toLocaleDateString();
    const newRating = { name: userName, cover: imageUrl, artist: artist, date: date, rating: rating, albumUrl: albumUrl }
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
        <form id="userInput" to="ratings">
          <div id="nameField">
            <input className="form-control" aria-label="Name"type="text" id="name" name="varName" placeholder="Name" />
          </div>
          <div id="ratingSlider">
            <label for="rating">Rating</label>
            <input type="range" className="form-range" min="1" max="10" step="0.5" name="varRange" onChange={onChange}></input>
              <output id="rangeOutput" for="rating">{rating}/10</output>
          </div>
          <button id="submit" type="submit" className="btn btn-primary" onClick={() => saveRating(rating)}>Submit Rating</button>
        </form>
      </div>
    </main>
  );
}