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
            selectedItem: {name: 'Bread', protein: 10, fat: 10, carb: 10},
            jokes: ['delicious', 'yum', 'interesting choice...', 'nice one', 'you really eat that?'],
            savedItems: [{name: 'Oranges'}, {name: 'Eggs'}],
            totalNut: {carb: 10, protein: 10, fat: 10}
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

    toPercent(num, total) {
        console.log(num, total);
        return Math.floor(Number(num) / Number(total) * 100) + '%'
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
            console.log('data here', data2[0]);
            let dataSum = +data2[1] + +data2[2] + +data2[3];
            this.setState({ 
                selectedItem: {name: data2[0], protein: this.toPercent(data2[1], dataSum), fat: this.toPercent(data2[2], dataSum), carb: this.toPercent(data2[3], dataSum)},
            });
        })
        .catch(err => console.log(err, 'Error in submitSearch'))
    }

    render(){
        const {selectedItem, jokes, savedItems, totalNut} = this.state;
        return (
            <div>
                <div className="header">
                    <h1 className="vit-title"> Perfect Plate </h1>
                    <div className="heart-contain">
                        <img className="heart" src="assets/fork.png" /> 
                    </div>
                    <Search getFood={this.submitSearch.bind(this)}/>  
                    <SelectedItem selected={selectedItem} jokes={jokes}/>
                    <div className="nums top-nums">
                            <span className="num-contain"><span className="num">carbs: {selectedItem.carb}</span></span>
                            <span className="num-contain"><span className="num">protein: {selectedItem.protein}</span></span>
                            <span className="num-contain"><span className="num">fat: {selectedItem.fat}</span></span>
                        </div>
                    <div className="macros">
                        <Measurement img='./assets/carbs.png' name='carbs' />
                        <Measurement img='./assets/protein.png' name='protein' />
                        <Measurement img='./assets/fat.png' name='fat' />
                        <div className="nums">
                            <span className="num-contain"><span className="num"> {totalNut.carb}</span></span>
                            <span className="num-contain"><span className="num">{totalNut.protein}</span></span>
                            <span className="num-contain"><span className="num">{totalNut.fat}</span></span>
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