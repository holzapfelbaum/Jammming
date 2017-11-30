import React from 'react';
import './SearchResults.css';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList /> <!-- Add a TrackList component -->
      </div>
    )
  }
}

default export SearchResults;
