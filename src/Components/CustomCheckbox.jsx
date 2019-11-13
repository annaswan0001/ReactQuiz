import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import QuizContext from "../context";


//вынести в утилс
const convertArrayToObject = (array, key) => { 
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: false
      };
    }, initialValue);
  };


function CustomCheckBox({ options, id }) { 
  const { state, dispatch } = useContext(QuizContext);
  const [value, setState] = React.useState(
    convertArrayToObject(options, "text")
  );
  const handleChangeCheckBox = name => event => {
    // dispatch({ type: "RESET", payload: false })
    setState({ ...value, [name]: event.target.checked });
   
  };

  useEffect(
    () => {
        if(value){
            let answers = [];
            for (let key in value) {
                if (value[key]){
                    answers.push(key);
                }
            }
            const answer = {
                id,
                correct:answers
            }
           
            dispatch({ type: "ADD_CURRENT_ANSWER", payload: answer });
        }
    },
    [value]
  );

  useEffect(
    () => {
        if(state.reset){
            setState(convertArrayToObject(options, "text"))
        }
    },
    [state.reset]
  );

  return (
    <FormGroup>
      {options.map(({ text }) => (
        <FormControlLabel
          key={text}
          control={
            <Checkbox
              checked={value[text]}
              onChange={handleChangeCheckBox(text)}
              value={value[text]}
            />
          }
          label={text}
        />
      ))}
    
    </FormGroup>
  );
}

CustomCheckBox.propTypes = {
  options: PropTypes.array
};

export default CustomCheckBox;
