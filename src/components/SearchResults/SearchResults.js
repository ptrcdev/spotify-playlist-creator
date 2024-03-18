import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {

    console.log(props.results)
    return (
        <div style={{ height: 700, backgroundColor: 'transparent', width: 'fit-content', padding: 30, border: '2px solid whitesmoke' }}>
            <h2 style={{ marginBottom: 15, marginTop: 25, color: 'whitesmoke', fontSize: 24 }}>Results</h2>
            <Tracklist tracks={props.results} onAddTrack={props.onAddTrack} />
        </div>
    )
}

export default SearchResults;