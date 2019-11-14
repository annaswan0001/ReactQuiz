import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import QuizContext from "../../context";
import BadMark from "./BadMark";
import GoodMark from "./GoodMark";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import Answers from "./ExpansionPanel.jsx";
import { useStyles } from "./ResultsStyle.js";
import PropTypes from "prop-types";

function Results({ history }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(QuizContext);

  const goHome = () => {
    dispatch({ type: "RESET", payload: true });
    localStorage.setItem(
      "state",
      JSON.stringify({
        ...state,
        reset: true,
        answers: []
      })
    );
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        {state.correct.length === 0 && (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )}
        {state.trueAnswer.length === state.correct.length &&
        state.correct.length > 0 ? (
          <GoodMark />
        ) : (
          <BadMark />
        )}

        <Typography variant="h5" component="h2" gutterBottom>
          Have a nice day!
        </Typography>
        <Button
          onClick={goHome}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          try once more
        </Button>
        <Answers />
      </Container>
    </div>
  );
}
Results.propTypes = {
  history: PropTypes.object
};
export default withRouter(Results);
