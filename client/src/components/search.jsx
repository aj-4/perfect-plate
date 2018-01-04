import React from 'react';
import ReactDOM from 'react-dom';

const Search = ({getFood}) => {
    return (
        <div className="search-contain">
            <div className="search-form">
                <input className="search-food" type="text" placeholder="Find a Food"/>
                <button className="search-button" onClick={getFood}>Add to Plate</button>
            </div>
        </div>
    )
}

export default Search;