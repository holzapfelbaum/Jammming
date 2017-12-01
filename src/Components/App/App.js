import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchResults: [
          name = {},
          artist = {},
          album = {}
        ],
        playlistName: '',
        playlistTracks: [
          name = {},
          artist = {},
          album = {}
        ]
      };
      this.addTrack = this.addTrack.bind(this);
  }

  async function addTrack(track) {
    try {
      let response = await fetch ('url', {
        method: 'POST'
      });
      if (response.ok) {
        let jsonResponse = await response.json;
        if (track.id === this.state.playlistTracks) {
          $TrackList.append(track);
          this.setState({track: track});
      }
      throw new Error ('Request failed!');
    } catch (error) {
      console.log(error);
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
