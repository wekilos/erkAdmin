import React,{useReducer} from 'react';
import {validate} from '../../../utils/validator';

import './Input.css';

const InputReducer=(state,action)=>{
    switch(action.type){
        case "CHANGE":
            return({
                ...state,
                value:action.val,
                isValid:validate(action.val,action.validators)
            });
        case "TOUCH":
            return ({
                ...state,
                isTouch:true
            })    
        
        default:
            return state
        
    }
}


const Input = props=>{
    const [InputState,dispatch]=useReducer(InputReducer,{
        value:"",
        isValid:false,
        isTouch:false
    })

    const changeHandler = event=>{
        dispatch({
            type:"CHANGE",
            val:event.target.value,
            validators:props.validators
        })
    }
    const touchHandler = event=>{
        dispatch({
            type:"TOUCH"
        })
    }

    const element = props.element==='input' ? (
         <input  id={props.id} 
                 type={props.type} 
                 placeholder={props.placeholder}
                 onChange={changeHandler}
                 value={InputState.value}
                 onBlur={touchHandler}
                  />):(
         <textarea id={props.id}
                   rows={props.rows || 3}
                   onChange={changeHandler}
                   value={InputState.value}
                   onBlur={touchHandler}
          />
         );


    return(
     <div className={`form-control ${!InputState.isValid && InputState.isTouch && 'form-control--invalid'}` }>
         <label className={props.className} htmlFor={props.id} >{props.label}</label>
         {element}
         {!InputState.isValid && InputState.isTouch && <p>{props.errorText}</p>}
     </div>

    );
};

export default Input;