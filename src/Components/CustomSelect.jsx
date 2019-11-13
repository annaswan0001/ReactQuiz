import React, { useState , useContext, useEffect } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import QuizContext from "../context";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const useStyles = makeStyles(theme => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  formControl: {
    minWidth: "100%",
    maxWidth: 300
  }
}));

function getStyles(name, optionList, theme) {
  return {
    fontWeight:
      optionList.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function CustomSelect({ options, id }) {
    const theme = useTheme();
    const classes = useStyles();

const { state, dispatch } = useContext(QuizContext);

  const [optionList, setoptionList] = React.useState([]);
  const handleChangeSelect = event => {
    // dispatch({ type: "RESET", payload: false })
    setoptionList(event.target.value);
  };

  useEffect(
    () => {
        if(optionList.length>0){
            const answer = {
                id,
                correct:optionList
            }
            dispatch({ type: "ADD_CURRENT_ANSWER", payload: answer });
        }
    },
    [optionList]
  );

  useEffect(
    () => {
        if(state.reset){
            setoptionList([])
        }
    },
    [state.reset]
  );



  return (
    <FormControl className={classes.formControl}>
      <Select
        multiple
        value={optionList}
        onChange={handleChangeSelect}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map(name => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, optionList, theme)}
          >
            {name}
          </MenuItem>
        ))}
        
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.array
};

export default CustomSelect;
