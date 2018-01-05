import React from 'react';
import ReactDOM from 'react-dom';

const ListItem = ({itemData}) => {
    console.log(itemData);
    return (
        <div className="list-item-container">
            <div className="list-item-name">{itemData.name}</div>  
            <div className="list-item-info">{itemData.carb}/{itemData.protein}/{itemData.fat}</div>
        </div>
    )
}
 
export default ListItem;