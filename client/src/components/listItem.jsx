import React from 'react';
import ReactDOM from 'react-dom';

const ListItem = ({itemData}) => {
    return (
        <div className="list-item-container">
            <div className="list-item-name">{itemData.name}</div>  
            <div className="list-item-info">{itemData.cals}{itemData.fats}{itemData.carbs}</div>
        </div>
    )
}
 
export default ListItem;