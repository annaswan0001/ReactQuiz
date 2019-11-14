import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import QuizContext from "../context";
import {re} from '../utils/regEx'



function CustomInput({ id }) {
  const [value, setValue] = useState("");
  const { state, dispatch } = useContext(QuizContext);
  
  const handleChange = event => {
    dispatch({ type: "RESET", payload: false })
    const inputValue = event.target.value;
    if (inputValue === "") {
      setValue(inputValue);
    } else {
      re.test(inputValue) && setValue(event.target.value.toLowerCase());
    }
  };

  useEffect(()=>{
    const stateLocalStorage = localStorage.getItem('state');
    if (stateLocalStorage === null){
      return 
    }
    const stateStorage = JSON.parse(stateLocalStorage);
    const indexValueStorage = stateStorage.answers.find(x => x.id === id)
    
    if(indexValueStorage){
      setValue(indexValueStorage.correct[0]);
    }
  }, [])

  useEffect(() => {
    if (value.length > 0) {
      const answer = {
        id,
        correct: [value]
      };

      dispatch({ type: "ADD_CURRENT_ANSWER", payload: answer });
    }
  }, [value]);

  
  useEffect(() => {
    if (state.reset) {
      setValue("");
    }
  }, [state]);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label="Type answer"
      autoFocus
      onChange={handleChange}
      value={value}
    />
  );
}

CustomInput.propTypes = {
  text: PropTypes.string,
  index: PropTypes.number
};

export default CustomInput;
