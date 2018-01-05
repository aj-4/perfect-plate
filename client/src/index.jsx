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
            selectedItem: {name: 'Enter an Item', protein: 0, fat: 0, carb: 0},
            jokes: ['delicious', 'yum', 'interesting choice...', 'nice one', 'you really eat that?','umm...'],
            savedItems: [],
            totalNut: {carb: 0, protein: 0, fat: 0, len:0}
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

    toPercent(num, total) {
        return Math.floor(Number(num) / Number(total) * 100) + '%'
    }

    submitSearch(e){
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

    addToList() {
        const {selectedItem, savedItems, totalNut} = this.state;
        let newNut = {carb: (totalNut.carb + Number(selectedItem.carb.slice(0, -1))), protein: totalNut.protein + Number(selectedItem.protein.slice(0, -1)), fat: totalNut.fat + Number(selectedItem.fat.slice(0, -1)), len: totalNut.len + 1}
        this.setState({
            savedItems: [selectedItem, ...savedItems], 
            totalNut: newNut,
            selectedItem: {name: 'Enter an Item', protein: 0, fat: 0, carb: 0}
        });
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
                    <SelectedItem selected={selectedItem} jokes={jokes} addToList={this.addToList.bind(this)}/>
                    <div className="nums top-nums">
                            
                        </div>
                    <div className="macros">
                        <Measurement img='./assets/carbs.png' name='carbs' />
                        <Measurement img='./assets/protein.png' name='protein' />
                        <Measurement img='./assets/fat.png' name='fat' />
                        <div className="nums">
                            <span className="num-contain"><span className="num"> {selectedItem.carb}</span></span>
                            <span className="num-contain"><span className="num"> {selectedItem.protein}</span></span>
                            <span className="num-contain"><span className="num"> {selectedItem.fat}</span></span>

                            {/* <span className="num-contain"><span className="num"> {totalNut.carb}</span></span>
                            <span className="num-contain"><span className="num">{totalNut.protein}</span></span>
                            <span className="num-contain"><span className="num">{totalNut.fat}</span></span> */}
                        </div>
                    </div>
                    <div className="listItems">
                        <SavedList listItems={savedItems} nutTotals={totalNut}/>
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