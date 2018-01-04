import React from 'react';
import ReactDOM from 'react-dom';

import Measurement from './components/measurement.jsx';
import Search from './components/search.jsx'
import MeasurementList from './components/measurementList.jsx'
import SelectedItem from './components/selectedItem.jsx'
import SavedList from './components/savedList.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedItem: {name: 'Bread'},
            jokes: ['delicious', 'yum', 'interesting choice...', 'nice one', 'you really eat that?'],
            savedItems: [{name: 'Oranges'}, {name: 'Eggs'}]
        }
    }

    componentDidMount() {
        //get list from db, 
        //then,
        // this.setState({ savedItems: [] });
    }

    submitSearch(){
        //api call here
        //then,
        this.setState({ selectedItem: {name: 'Yogurt'} });
    }

    render(){
        const {selectedItem, jokes, savedItems} = this.state;
        return (
            <div>
                <div className="header">
                    <h1 className="vit-title"> Perfect Plate </h1>
                    <div className="heart-contain">
                        <img className="heart" src="assets/fork.png" /> 
                    </div>
                    <Search submit={this.submitSearch}/>  
                    <SelectedItem selected={selectedItem} jokes={jokes}/>
                    <div className="macros">
                        <Measurement img='./assets/carbs.png' name='carbs' />
                        <Measurement img='./assets/protein.png' name='protein' />
                        <Measurement img='./assets/fat.png' name='fat' />
                        <div className="nums">
                            <span className="num-contain"><span className="num">100{/* selectedItem.carbs  */}</span></span>
                            <span className="num-contain"><span className="num">20{/* selectedItem.protein */}</span></span>
                            <span className="num-contain"><span className="num">5{/* selectedItem.fats */}</span></span>
                        </div>
                    </div>
                    <div className="listItems">
                        <SavedList listItems={savedItems}/>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    < App />,
    document.getElementById('app')
);