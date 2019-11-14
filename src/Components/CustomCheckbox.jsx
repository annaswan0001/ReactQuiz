import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import QuizContext from "../context";
import {convertArrayToObject} from '../utils/utils'


function CustomCheckBox({ options, id }) {
  const { state, dispatch } = useContext(QuizContext);
  const sortOptions = options.sort();
  const [value, setState] = React.useState(
    convertArrayToObject(sortOptions, "text")
  );
  const handleChangeCheckBox = name => event => {
    dispatch({ type: "RESET", payload: false });
    setState({ ...value, [name]: event.target.checked });
  };

  useEffect(() => {
    if (value) {
      let answers = [];
      for (let key in value) {
        if (value[key]) {
          answers.push(key);
        }
      }
      const answer = {
        id,
        correct: answers
      };

      dispatch({ type: "ADD_CURRENT_ANSWER", payload: answer });
    }
  }, [value]);

  useEffect(() => {
    if (state.reset) {
      setState(convertArrayToObject(options, "text"));
    }
  }, [state.reset]);

  useEffect(() => {
    const stateLocalStorage = localStorage.getItem("state");
    if (stateLocalStorage === null) {
      return;
    }
    const stateStorage = JSON.parse(stateLocalStorage);
    const indexValueStorage = stateStorage.answers.find(x => x.id === id);

    if (indexValueStorage) {
      let valueStorage = indexValueStorage.correct;
      let keyObj = convertArrayToObject(sortOptions, "text");

      let ValueStorageObject = valueStorage.reduce(
        (a, b) => ((a[b] = true), a),
        {}
      );
      const arr2 = Object.assign({}, keyObj, ValueStorageObject);
      setState(arr2);
    }
  }, []);

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
  options: PropTypes.array,
  id: PropTypes.number
};

export default CustomCheckBox;
