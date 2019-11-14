import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Question from "./Views/Question";
import QuizContext from "./context";
import _ from "lodash";
import Dialog from "./Components/Dialog";
import Loading from "./Components/Loading";
import { withRouter } from "react-router";
import { useStyles } from "./QuizStyle";
import Copyright from "./Components/Copyright";
import ErrorBoundary from "./ErrorBoundary";
import PropTypes from 'prop-types';



function Quiz({ history }) {
  const classes = useStyles();

  const { state, dispatch } = useContext(QuizContext); //connect reducer to components
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false); //open ModalDialog


  useEffect(() => {
    if (localStorage.getItem("state")) {
      const answersLocalStorage = localStorage.getItem("state");
      const quiz = JSON.parse(answersLocalStorage);
      dispatch({ type: "ADD_DATA", payload: quiz.data });
      let correct = quiz.data.map(({ id, correct }) => ({ id, correct }));
      dispatch({ type: "ADD_CORRECT_ANSWER", payload: correct });
    } else {
      getResults();
    }
  }, []);

  const getResults = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:3000/data`);

      dispatch({ type: "ADD_DATA", payload: response.data });
      let correct = response.data.map(({ id, correct }) => ({ id, correct }));
      dispatch({ type: "ADD_CORRECT_ANSWER", payload: correct });
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          data: response.data,
          correct
        })
      );
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };



  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  const reset = () => {
    dispatch({ type: "RESET", payload: true });
  };


  const countAnswer = () => {
    let correctValue = { ...state.correct };
    let answerValue = { ...state.answer };
    correctValue = state.correct.map(({ id, correct }) => {
      correct.sort();
      return { id, correct };
    });
    answerValue = state.answers.map(({ id, correct }) => {
      correct.sort();
      return { id, correct };
    });

    let presentsAnswer = _.intersectionWith(
      correctValue,
      answerValue,
      _.isEqual
    );
    let differentAnswer = _.differenceWith(
      correctValue,
      answerValue,
      _.isEqual
    );
    dispatch({ type: "SET_TRUE_ANSWER", payload: presentsAnswer });
    dispatch({ type: "SET_FALSE_ANSWER", payload: differentAnswer });
    history.push("/results");
  };

  const checkAnswer = e => {
    e.preventDefault();
    if (state.answers.length < state.correct.length) {
      handleOpen();
    } else {
      countAnswer();
    }
  };


  return (
    <ErrorBoundary>
      <QuizContext.Provider value={{ state, dispatch }}>
        {open && (
          <Dialog
            countAnswer={countAnswer}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        )}
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            {loading ? (
              <Loading className={classes.loading} />
            ) : (
              <React.Fragment>
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>Quiz</Avatar>
                  <Typography classname={classes.title} component="h1" variant="h5">
                    Lets do it!
                  </Typography>
                  <form
                    className={classes.form}
                    onSubmit={checkAnswer}
                    noValidate
                  >
                    <div className="App">
                      {error && (
                        <Typography
                          component="h1"
                          variant="h5"
                          color="secondary"
                        >
                          Ooops!Something go wrong!
                        </Typography>
                      )}
                      {state.data.length > 0 &&
                        state.data.map(({ question, answers, id, type }) => (
                          <Question
                            key={id}
                            question={question}
                            options={answers}
                            type={type}
                            id={id}
                          />
                        ))}
                    </div>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Finish Quiz
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={reset}
                    >
                      reset
                    </Button>
                  </form>
                </div>

                <Box mt={2}>
                  <Copyright />
                </Box>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Grid>
      </QuizContext.Provider>
    </ErrorBoundary>
  );
}

Quiz.propTypes = {
  history: PropTypes.object
};

export default withRouter(Quiz);
