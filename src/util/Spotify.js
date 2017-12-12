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
      //                                              authorize?client_id=6b3dd77d6ce241e1b4360459df1397ea&response_type=token&scope=playlist-modify-public&redirect_uri=http://jammmingjon.surge.sh
      window.location = accessUrl; // in line above, we set the accessUrl according to Spotify's requirements; now, we set the url the user will be sent to as that accessUrl using window.location
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { // term
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => ({
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
    },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    let headers = {
      'Authorization': `Bearer ${accessToken}`
    };
    let queryParameter = {
      'limit': 50
    };
    let userId = '';
    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/me/playlists`, {headers: headers, queryParameter: queryParameter}).then(response => { // Added GET playlists functionality
        return response.json();}); // Added GET playlists functionality
      }).then(jsonResponse => { // Added GET playlists functionality
        let currentPlaylists = jsonResponse.map(jsonResponse.items.playlist.name); // Added GET playlists functionality
        if (currentPlaylists.indexOf(playlistName) > -1) { // // Added redirect user if matching name found functionality
          return prompt('Playlist Name Already Taken'); // Added redirect user if matching name found functionality
        } else { // Original Jammming functionality
          headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          };
          return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    }
  }
  );
}};

export default Spotify;
