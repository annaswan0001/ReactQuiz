import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "../Components/CustomInput";
import CustomRadio from "../Components/CustomRadio";
import CustomCheckBox from "../Components/CustomCheckbox";
import CustomSelect from "../Components/CustomSelect";


const useStyles = makeStyles(theme => ({
  typography: {
    marginTop: theme.spacing(2)
  }
}));

const Question = ({ question,id, options, type }) => {
  const classes = useStyles();

  let answer = "";

  switch (type) {
    case "input":
      answer = <CustomInput id={id} options={options} />;
      break;
    case "select":
      answer = <CustomSelect id={id} options={options} />;
      break;
    case "checkbox":
      answer = <CustomCheckBox id={id} options={options} />;
      break;
    case "radio":
      answer = <CustomRadio id={id} options={options} />;
      break;
    default:
      return answer;
      break;
  }

  return (
    <div className="questionBox">
      <Typography className={classes.typography} component="p">
        {id}.{question}
      </Typography>
       {answer}
    </div>
  );
};

export default Question;
