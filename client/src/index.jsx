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

    formatName(itemObj) {
        let firstLetter = itemObj.name[0].toUpperCase();
        return firstLetter + itemObj.name.toLowerCase().slice(1);
    }

    componentDidMount() {
        //get list from db, 
        fetch('/plate')
        .then(data => data.json())
        .then(data2 => {
            let formatAll = data2.map(item => {
                return {
                    name: this.formatName(item)
                }
            })
            this.setState({savedItems: formatAll});
            return formatAll;
        })
        .catch(err => console.error('error in cdm: ', err))
    }

    inForm(val) {
        console.log(val);
    }

    submitSearch(e){
        console.log('in submit search', e);
        fetch('/api', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({query: e})
        })
        .then(data => {
            return data.json()
        })
        .then(data2 => {
            console.log(data2);
            this.setState({ selectedItem: {name: this.formatName(data2[0])} });
        })
        .catch(err => console.log(err, 'Error in submitSearch'))
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
                    <Search getFood={this.submitSearch.bind(this)}/>  
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