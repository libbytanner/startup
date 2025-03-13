import React from 'react';
import '../gallery.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap'



export function Search(props) {
//   const [albums, setAlbums] = React.useState([]);
  const username = props.username;
  const navigate = useNavigate();
  const location = useLocation();
  const albums = location.state;
  const [selected, setSelected] = React.useState('');
  console.log("Albums:", albums);

  React.useEffect(() => {
    if (selected) {
      const artist = selected.artists[0].name;
      const title = selected.name;
      const id = Date.now();
      const cover = selected.images[0].url;
      const year = selected.release_date;
      const url = selected.external_urls.spotify;

      const albumPckg = {artist: artist, title: title, id: id, cover: cover, year: year, url: url};
    
      navigate('/album', {state: albumPckg});
  }
  }, [selected])

  const albumResults = albums.album.map((album) => ( 
        <div className="card h-100" key={album.id}>
            <img src={album.images[0].url} className="card-img-top" id="cover" alt="album cover"/>
            <div className="card-body">
              <h5 className="card-title">{album.name}</h5>
              <p className="card-text">{album.artists[0].name}</p>
              <span className="icon"><img src="icon.svg" width="25px"/></span>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item button">
                <Button className="btn btn-primary" onClick={() => setSelected(album)}>Rate this album</Button>
              </li>
            </ul>
          </div>
      )
  )


  return (
    <main>
        <div className="container">
          {albumResults}
      </div>
    </main>
  );
}