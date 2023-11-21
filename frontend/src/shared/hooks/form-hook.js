import  { useCallback, useReducer} from 'react';
// Hook is a normal js function,it start with use, 
//a function which shares a stateful logic, a special react function recognize .





const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};


export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });
    //my state is an object contain inputs and isValid initially state and inputs it's also a nested object that store of the validity of the individual inputs and isValid store whether the form is valide or not 



  //to avoid an infinity loop we use the useCallback hook
    //the id value isValid was stored some how in react and they will be reused every time we execute 
    //in this function we will manange validity and values of the entire form  
    const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id
        });
    },
    []);

    return [formState, inputHandler]

};