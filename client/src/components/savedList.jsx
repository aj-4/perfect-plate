import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './listItem.jsx'

const SavedList = ({listItems, nutTotals}) => {
    const allItems = listItems.map(itemData => {
        return (<div className="list-item-div" key={itemData.name}><ListItem itemData={itemData}/></div>);
    });
    return(
        <div className="all-list-items">
            {allItems}
            
            {
                nutTotals.len > 0 && 
                <div className="nut-totals">

                    <div className="nut-totals-header">Plate Totals</div>

                    <span className="nut-total-detail">Carb</span>
                    <span className="nut-total-item">{Math.round(nutTotals.carb / nutTotals.len) + '%'}</span>

                    <span className="nut-total-detail">Protein</span>
                    <span className="nut-total-item">{Math.round(nutTotals.protein / nutTotals.len) + '%'}</span>

                    <span className="nut-total-detail">Fat</span>
                    <span className="nut-total-item">{Math.round(nutTotals.fat / nutTotals.len) + '%'}</span>
                </div>
            }
        </div>
    )
};

export default SavedList;