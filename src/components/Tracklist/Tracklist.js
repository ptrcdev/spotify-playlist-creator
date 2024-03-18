import React from "react";
import Track from '../Track/Track';
import './Tracklist.css';

function Tracklist(props) {
    console.log(props.tracks);
    return (
        <div className="tracklist-container">
            {
                props.tracks ? props.tracks.map(track => (
                    <Track track={track} key={track.id} onAddTrack={props.onAddTrack} isRemovable={props.isRemovable} onRemove={props.onRemove}/>
                )) : null
            }
        </div>
    )
}

export default Tracklist;