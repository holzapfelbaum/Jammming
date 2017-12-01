import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TrackList" key={track.id}>
        {this.props.tracks.map()}
      </div>
    )
  }
}

export default TrackList;
