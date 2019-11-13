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
    // dispatch({ type: "RESET", payload: false })
    setSelectedValue(event.target.value);
    

  };

  useEffect(
    () => {
        if(selectedValue.length>0){
         
        const answerRadio = {
            id,
            correct:[selectedValue]
        }
        if(answerRadio.id !== 4){
            dispatch({ type: "ADD_CURRENT_ANSWER", payload: answerRadio });
        
        }
    }
        
    },
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
  return (
    <RadioGroup
      aria-label="position"
      name="position"
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
  options: PropTypes.array
};

export default CustomRadio;
