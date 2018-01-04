import React from 'react';
import ReactDOM from 'react-dom';

const SelectedItem = ({selected, jokes}) => {
    return (
        <div className = 'selected-contain'>
            {/* {selected} */}
            <div className="selected-title">{
                selected && selected.name
                }</div> 
            <div className="selected-joke">{
                jokes[Math.floor(Math.random(jokes.length))]
            }</div>
        </div>
    )
};

export default SelectedItem;