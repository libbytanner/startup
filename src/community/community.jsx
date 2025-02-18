import React from 'react';
export function Community() {
  const [events, setEvent] = React.useState([]);

  const recentRatings = [];

  function newRating() {
    setEvent()
  }

  // if (albums.length) {
  //   for (const[i,album] of albums.entries()) {
  //     recentRatings.push(
  //       <div className="card h-100" key={album.id}>
  //         <img src="placeholder.png" className="card-img-top" alt="album cover"/>
  //         <div className="card-body">
  //           <h5 className="card-title">{album.title}</h5>
  //           <p className="card-text">Artist:</p>
  //           <span className="icon"><img src="icon.svg" width="25px"/></span>
  //         </div>
  //         <ul className="list-group list-group-flush">
  //           <li className="list-group-item">Rating: <span>rating</span></li>
  //           <li className="list-group-item">User: <span>user</span></li>
  //           <li className="list-group-item">Date: <span>date</span></li>
  //           <li className="list-group-item">
  //               <a href="https://open.spotify.com" className="btn btn-primary">View Album on Spotify</a>
  //           </li>
  //         </ul>
  //       </div>
  //     )
  //   }
  // } else (
  //   <p>Please rate an album!</p>
  // )

  return (
    <main>
      <div className="container">
        {albumRatings}
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