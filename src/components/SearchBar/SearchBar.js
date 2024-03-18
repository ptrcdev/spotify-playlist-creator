import React, { useCallback, useState } from "react";
import './SearchBar.css';

function SearchBar(props) {
    const [userInput, setUserInput] = useState("");

    const handleOnChange = useCallback((event) => {
        setUserInput(event.target.value);
    }, []);

    const handleOnClick = useCallback(() => {
        props.onSearch(userInput);
    }, [props.onSearch, userInput]);
    
    return (
        <div className="search-bar-container">
            <input placeholder="Song Title" onChange={handleOnChange}/>
            <button className="search-button" onClick={handleOnClick}>
                SEARCH
            </button>
        </div>
    )
}

export default SearchBar;
