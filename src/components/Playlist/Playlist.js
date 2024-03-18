import React from "react";
import Tracklist from "../Tracklist/Tracklist";

const newPlaylistNameInputStyle = {
    backgroundColor: 'transparent',
    padding: 20,
    fontSize: 24,
    "font-weight": "900",
    border: "none",
    color: 'lightgrey',
    marginBottom: 10
}

const addToSpotifyButtonStyle = {
    margin: 20,
    padding: 10,
    width: 150,
    backgroundColor: "green",
    border: "0.5px solid lightgreen",
    borderRadius: 50,
    fontSize: 20,
    color: "whitesmoke",
    alignSelf: 'center'
}
function Playlist(props) {
    return (
        <div style={{ height: 700, backgroundColor: 'transparent', width: 'fit-content', padding: 30, border: '2px solid whitesmoke'}}>
            <input type="text" placeholder="New Playlist" value={props.playlistName} onChange={props.onChangeName} style={newPlaylistNameInputStyle}  />
            <Tracklist tracks={props.tracks} isRemovable={true} onRemove={props.onRemove}/>
            { props.tracks.length > 0 ? <button className="add-to-spotify" onClick={() => props.saveToSpotify({playlistName: props.playlistName, tracks: props.tracks})} style={addToSpotifyButtonStyle}>Save to Spotify</button> : null}
        </div>
    )
}

export default Playlist;