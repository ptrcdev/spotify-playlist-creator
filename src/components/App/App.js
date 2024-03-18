import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../spotify/Spotify';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const search = useCallback( (song) => {
      Spotify.searchSong(song).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return
    }

    setPlaylistTracks([...playlistTracks, track]);
  }, [playlistTracks]);

  const handleRemoveTrack = (track) => {
    if (!playlistTracks.some((savedTrack) => savedTrack !== track.id)) return;

    setPlaylistTracks(playlistTracks.filter((savedTrack) => savedTrack.id !== track.id));
  }

  const handleChangeName = (event) => {
    setPlaylistName(event.target.value);
  }

  const handleSave = () => {
    // create new playlist with all them tracks
    // save it to spotify

    console.log("in progres...");
    Spotify.saveToSpotify();
  }

  return (
    <div className='app-container'>
      <h1>Ja<span>mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />

        <div className="results-container">
          <SearchResults results={searchResults} onAddTrack={addTrack} />
          <Playlist tracks={playlistTracks} onRemove={handleRemoveTrack} playlistName={playlistName} onChangeName={handleChangeName} saveToSpotify={handleSave} />
        </div>

      </div>
    </div>
  );
}

export default App;
//TODO:
/**
 *  - add Save to Spotify button and its functionality
 * 
 * 
 * 
 */