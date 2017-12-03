import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchResults: [],
        playlistName: 'New Playlists',
        playlistTracks: []
      };
      this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (track.id !== this.state.playlistTracks) {
      this.state.playlistTracks.append(track);
      this.setState({playlistTracks: playlistTracks});
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
