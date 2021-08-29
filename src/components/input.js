import React from 'react';

import './input.css';



const Input = props=>{
     

    return(
        <div className="InputDiv">
            <p >{props.addBefore}</p>
            <input 
            id={props.id}
            className={props.className}
            style={props.style}
            name={props.name}
            type={props.type}
            value={props.value} 
            onClick={props.onClick} 
            onChange={props.onChange}
            placeholder={props.placeholder}
            hidden={props.type=="file" && true}   />
        </div>
    );
};

export default Input;