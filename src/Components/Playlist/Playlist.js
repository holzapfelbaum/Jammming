import React from 'react';
import './Playlist.css';
// import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div className="Playlist">
      <input defaultValue={'New Playlist'} />
      // <TrackList />
      <a className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
  }
}

export default Playlist;
