const clientId = '6b3dd77d6ce241e1b4360459df1397ea';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve =>
        resolve(accessToken));
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); // what does the ([^&]*)/ stand for?
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      let expiresIn = 15;
      window.setTimeout(() => accessToken = '', expiresIn * 60);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.assign(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);
    }
  }
};

export default Spotify;

getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

   //
    //const expiresInMatch =
    if (accessTokenMatch && expiresInMatch) {
      //your code here
      return accessToken;
    } else {
     // your code here
    }
  },
