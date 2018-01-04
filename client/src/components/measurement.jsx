import React from 'react';
import ReactDOM from 'react-dom';

const Measurement = ({name, img}) => {
    return (
        <div className="measurement">
            <img src={img} alt={name}/>
        </div>
    );
}

export default Measurement