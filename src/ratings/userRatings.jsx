import React from 'react';
import '../gallery.css'



export function Ratings() {
  const [albums, setAlbums] = React.useState([])

  React.useEffect(() => {
    const albumsText = localStorage.getItem('albums')
    if (albumsText) {
      setAlbums(JSON.parse(albumsText))
    }
    console.log(albums)
  }, [])

  const albumRatings = [];
  if (albums.length) {
    for (const[i,album] of albums.entries()) {
      albumRatings.push(
        <div className="card h-100" key={album.id}>
            <img src="placeholder.png" className="card-img-top" alt="album cover"/>
            <div className="card-body">
              <h5 className="card-title">{album.title}</h5>
              <p className="card-text">Artist</p>
              <span className="icon"><img src="icon.svg" width="25px"/></span>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Rating: {album.rating}</li>
              <li className="list-group-item">Date: {album.date}</li>
              <li className="list-group-item button">
                <a href="https://open.spotify.com" className="btn btn-primary">View Album on Spotify</a>
              </li>
            </ul>
          </div>
      )
    }
  } else [
    <p>Please rate an album!</p>
  ]

  return (
    <main>
        <div className="container">
          {albumRatings}
      </div>
    </main>
  );
}