import React from 'react';

export function Community(props) {
  const [albums, setAlbums] = React.useState([]);
  const username = props.username

  React.useEffect(() => {
    const albumsText = localStorage.getItem('albums')
    if (albumsText) {
      setAlbums(JSON.parse(albumsText))
    }
  }, [])

  const recentRatings = [];
  if (albums.length) {
    for (const[i,album] of albums.entries()) {
      recentRatings.push(
        <div className="card h-100" key={album.id}>
          <img src="placeholder.png" className="card-img-top" alt="album cover"/>
          <div className="card-body">
            <h5 className="card-title">{album.title}</h5>
            <p className="card-text">Artist:</p>
            <span className="icon"><img src="icon.svg" width="25px"/></span>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: {album.rating}</li>
            <li className="list-group-item">User: {username}</li>
            <li className="list-group-item">Date: {album.date}</li>
            <li className="list-group-item">
                <a href="https://open.spotify.com" className="btn btn-primary">View Album on Spotify</a>
            </li>
          </ul>
        </div>
      )
    }
  } else (
    <p>Please rate an album!</p>
  )

  return (
    <main>
      <div className="container">
        {recentRatings}
      </div>
    </main>
  );
}
  
      
{/* <div className="card">
          <img src="placeholder.png" className="card-img-top" alt="album cover"/>
          <div className="card-body">
            <h5 className="card-title">Album Title</h5>
            <p className="card-text">Artist:</p>
            <span className="icon"><img src="icon.svg" width="25px"/></span>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Rating: <span>rating</span></li>
            <li className="list-group-item">User: <span>user</span></li>
            <li className="list-group-item">Date: <span>date</span></li>
          </ul>
        </div> */}