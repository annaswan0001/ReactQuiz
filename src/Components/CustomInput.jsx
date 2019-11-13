import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import QuizContext from "../context";
import {re} from '../utils/regEx'



function CustomInput({ id }) {
  const [value, setValue] = useState("");
  const { state, dispatch } = useContext(QuizContext);
  
  const handleChange = event => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setValue(inputValue);
    } else {
      re.test(inputValue) && setValue(event.target.value.toLowerCase());
    }
  };

  useEffect(()=>{
    const state = localStorage.getItem('state');
    if (state === null){
      return 
    }
    const answersLocalStorage = JSON.parse(state);
    console.log(answersLocalStorage)
    // const valueFromLocalStorage = answersLocalStorage.map(idLocal=>idLocal===id)
    // console.log("значение локал",valueFromLocalStorage)
  })
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
