const client_id = "56d85e728d4445cda4818cb72757175e";
const redirect_uri = 'http://localhost:3000';
let accessToken;

const Spotify = {
    // get access token
    getAccessToken() {
        if (accessToken) return

        const accessTokenHref = window.location.href.match(/access_token=([^&]*)/);
        const expiresInHref = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenHref && expiresInHref) {
            accessToken = accessTokenHref[1];
            const expiresIn = Number(expiresInHref[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const endpoint = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = endpoint;
        }
    },

    // search func
    async searchSong(song) {
        //const access_token = this.getAccessToken();

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${song}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) throw new Error(`Unable to fetch. Status: ${response.status}`);

            const json = await response.json();

            if (!json.tracks) return [];

            return json.tracks.items.map((track) => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    preview_url: track.preview_url ? track.preview_url : "",
                    img: track.album.images[2]
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    async getUserId() {
       try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) throw new Error(`Unable to fetch user id. Status: ${response.status}`);

            const data = await response.json();

            return data.id;
        } catch (error) {console.log(error);}
    },
    // save to spotify
    async saveToSpotify(playlist) {
        try {
            const userId = await this.getUserId();

            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playlist.playlistName,
                    description: "",
                    public: true
                })
            });

            if (!response.ok) throw new Error(`Unable to fetch user playlists. Status: ${response.status}`);

            const data = await response.json();
            const playlist_id = data.id;

            // add tracks to playlist 
            const addToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
            // POST
            const response_playlist = await fetch(addToPlaylistEndpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        uris: playlist.tracks
                    }
                )
            });

            if (!response_playlist.ok) throw new Error(`Unable to save playlist. Status: ${response_playlist.status}`);

            return
            
            
        } catch (error) {
            console.log(error);
        }
    }

}

export default Spotify;