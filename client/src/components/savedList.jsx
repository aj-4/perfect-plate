import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './listItem.jsx'

const SavedList = ({listItems}) => {
    const allItems = listItems.map(itemData => {
        return (<div className="list-item-div" key={itemData.name}><ListItem itemData={itemData}/></div>);
    });
    return(
        <div className="all-list-items">
            {allItems}
        </div>
    )
};

export default SavedList;