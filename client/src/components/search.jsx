import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inForm : ''
        }
    }
    
    handleChange(e) {
        this.state.inForm = e.target.value;
    }

    handleClick() {
        this.props.getFood(this.state.inForm);
    }
    
    render() {
        const {getFood} = this.props;
        return (
            <div className="search-contain">
                <div className="search-form">
                    <input className="search-food" onChange={this.handleChange.bind(this)} type="text" placeholder="Find a Food"/>
                    <button className="search-button" onClick={this.handleClick.bind(this)}>Search</button>
                </div>
            </div>
        )
    }
}

export default Search;