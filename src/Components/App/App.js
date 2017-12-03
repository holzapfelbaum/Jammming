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
      this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks !== track) {
      this.state.playlistTracks.push(track.id);
      this.setState({playlistTracks: track});
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks === track) {
      this.state.playlistTracks.filter(track => track !== track.id); // filter should be the correct method; while it does not change the original array, I have created a new array that does not include the id of the track we want to remove (track.id)
      this.setState({playlistTracks: track})
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
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
