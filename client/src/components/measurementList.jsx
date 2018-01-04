import React from 'react';
import ReactDOM from 'react-dom';
import Measurement from './measurement.jsx'

const MeasurementList = ({macros}) => {
    return (
        <div>
        {
            macros.map(macro => {
                console.log(macro);
                <Measurement img={macro.img} name={macro.name} val='0'/>        
            })
        }
        </div>
    )
}

export default MeasurementList;