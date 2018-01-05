import React from 'react';
import ReactDOM from 'react-dom';

const SelectedItem = ({selected, jokes, addToList}) => {
    return (
        <div className = 'selected-contain'>
            <div className="selected-title" style={selected.name === 'Enter an Item' ? {'fontSize' : '5rem', 'color': 'white'} : {}}>{
                selected && selected.name
                }</div> 
            <div className="selected-joke">{
                selected.name !== 'Enter an Item' &&
                jokes[Math.floor(Math.random() * jokes.length)]
            }</div>
            <div >
                {
                    selected.name !== 'Enter an Item' &&
                    <button className="add-button" onClick={addToList}>Add To Plate</button>
                }
            </div>
        </div>
    )
};

export default SelectedItem;