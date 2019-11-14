import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import QuizContext from "../../context";


export default function Results() {

  const { state} = useContext(QuizContext);

  return (
      <Typography variant="h3" component="h3" gutterBottom>
        {state.trueAnswer.length >= 1
          ? `You have ${state.trueAnswer.length} correct answer`
          : `You have ${state.trueAnswer.length} correct answer. We are sorry! You should learn more!`}
      </Typography>

  );
}
