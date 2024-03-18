import React, { useState } from "react";
import './Track.css';

function Track(props) {
    return (
        <div className="Track-container">
            <div className="img-container">
                <img src={props.track.img.url} alt="album img" />
            </div>
            <div className="Track-info">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist}</p>
            </div>
            {props.isRemovable ? <button onClick={() => props.onRemove(props.track)}>-</button> :  <button onClick={() => props.onAddTrack(props.track)}>+</button>} 
        </div>
    )
}

export default Track;

