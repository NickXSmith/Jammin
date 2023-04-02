let accessToken;
const clientID = 'd82f01b5ecd1445282bcb5bb14ed7c31';
const redirectURI = "http://localhost:3000";

const Spotify = {
    getAccessToken(){
        if(accessToken) {
            return accessToken;
        } 

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //this clears the parameters to get a new token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        let fetchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        return fetch(fetchURL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            })
    },

    savePlaylist(name, tracks) {
        if (!name || !tracks) {
            return;
        };
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: name})})
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                const playlistID = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({uris: tracks})})
        })
    },
}

export {Spotify}