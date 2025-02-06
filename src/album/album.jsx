import React from 'react';
import '../forms.css'

export function Album() {
  return (
    <main>
      <img id="albumCover" src="placeholder.png"/>
      <div id="albumInfo">
        <div>
          <h1>Album Title</h1>
          <h3>Artist: <span id="artistName">Artist Name</span></h3>
          <h3>Year: <span id="year">2025</span></h3>
        </div>
        <form id="userInput" action="userRatings.html">
          <div id="nameField">
            <input className="form-control" aria-label="Name"type="text" id="name" name="varName" placeholder="Name" />
          </div>
          <div id="ratingSlider">
            <label for="rating">Rating</label>
            <input type="range" className="form-range" min="1" max="10" step="0.5" name="varRange"></input>
              <output id="rangeOutput" for="rating">0</output>
          </div>
          <button id="submit" type="submit" className="btn btn-primary">Submit Rating</button>
        </form>
      </div>
    </main>
  );
}