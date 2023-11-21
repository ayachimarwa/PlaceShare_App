import React, {useReducer, useEffect} from "react";
   //useReducer allows us to manage multiple states more complex

import { Validator, validate } from '../../util/validators';
import './Input.css';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return{
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            };
        case 'TOUCH':{
            return{
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};


const Input = props  =>{
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;   //get the id and the onInput from the props
    const { value, isValid} = inputState;   //get the value and isValid from the inputState

    //this function runs where ever the inputstate and the props changes
    useEffect(() => {
        onInput(id, value, isValid )
    }, [id, value, isValid, onInput ]);
    

    /*val: event.target.value
     event is an object of the changeHandler
     event.target is the input elemnent on wich this event was triggered
     .value is the value that the user entred */

     //update our state
    const changeHandler = event => {
        dispatch({
            type:'CHANGE', 
            value: event.target.value, 
            validators: props.validators
        });
    };

    const touchHandler = () =>{
        dispatch({
            type: 'TOUCH'
        });
    };

    //input ynajem ykoun input wa ella textareaheka 3leh 3malna kin if 
    const element = 
    props.element === 'input' ? (
        <input 
            id = {props.id} 
            type = {props.type} 
            placeholder = {props.placeholder} 
            onChange = {changeHandler} 
            onBlur={touchHandler}
            value = {inputState.value}
        />
        //onblur lezem teclicki 3lih martin after a losing a focus we show an error let give the user a chance to type sthg

    ) : (
        <textarea 
            id={props.id}   
            rows={props.rows || 3}  
            onChange={changeHandler} 
            onBlur={touchHandler} 
            value = {inputState.value}
        />   //3 is the number of rows par default
    );



     //controle the input:nchoufou valide ou non
    return (
        //if the inputState is not valid we add a new class to the div (this mean a new style )
        <div className={`form-control ${!inputState.isValid && inputState.isTouched &&
            'form-control--invalid'}`}> 

            <label htmlFor="props.id">{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}

        </div>
    );
};

export default Input;