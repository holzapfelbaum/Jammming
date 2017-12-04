const clientId = '6b3dd77d6ce241e1b4360459df1397ea';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); // what does the ([^&]*)/ stand for? per Elise, ^ means matches beginning of input, * means matches preceding expression 0 or more times, and so in this case, "any number of characters until a & is found"; i.e. if you have https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123, then it is everything between access_token= and the first &
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl; // in line above, we set the accessUrl according to Spotify's requirements; now, we set the url the user will be sent to as that accessUrl using window.location
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        } else {
          return [];
        }
      });
    }
  },

  savePlaylist(this.props.playlistName, track.uri[]) { // this entire method is one HUGE guess...I had no idea where to even begin
    if (!this.props.playlistName && !track.uri[]) {
      return;
    }
    let accessToken = `${accessToken}`;
    let headers = {
      'Authorization': `Bearer ${accessToken}`
    }
    let userId = '';
    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      response.id = userId;
    }).then(await fetch (`https://api.spotify.com//v1/users/${userId}/${this.props.playlistName}`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: this.props.playlistName})
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      response.id = playlistID;
    }))
  }
};

export default Spotify;
