import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import QuizContext from "../context";

function CustomRadio({ options, id}) {
 
  const { state, dispatch } = useContext(QuizContext);
  const [selectedValue, setSelectedValue] = useState("");


  const handleChange = event => {
    dispatch({ type: "RESET", payload: false })
    setSelectedValue(event.target.value);
  };

  useEffect(
    () => {
        if(selectedValue.length>0){
        const answerRadio = {
            id,
            correct:[selectedValue]
        }
        dispatch({ type: "ADD_CURRENT_ANSWER", payload: answerRadio });
    }},
    [selectedValue]
  );

  useEffect(
    () => {
        if(state.reset){
            setSelectedValue("")
        }
    },
    [state.reset]
  );


  useEffect(()=>{
    const stateLocalStorage = localStorage.getItem('state');
    if (stateLocalStorage === null){
      return 
    }
    const stateStorage = JSON.parse(stateLocalStorage);
    const indexValueStorage = stateStorage.answers.find(x => x.id === id)
    if(indexValueStorage){
      setSelectedValue(indexValueStorage.correct[0]);
    }
  }, [])


  return (
    <RadioGroup
      value={selectedValue}
      onChange={handleChange}
      row
    >
      {options.map(text=> (
        <FormControlLabel
          key={text}
          value={text}
          control={<Radio color="primary" />}
          label={text}
          labelPlacement="end"
        />
      ))}
      
    </RadioGroup>
  );
}

CustomRadio.propTypes = {
  options: PropTypes.array, 
  id: PropTypes.number
};

export default CustomRadio;
