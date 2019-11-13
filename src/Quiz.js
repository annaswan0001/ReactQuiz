import React, { useState, useEffect, useReducer, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Question from "./Views/Question";
import QuizContext from "./context";
import _ from "lodash";
import Dialog from './Components/Dialog'
import { withRouter } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://annaswan.website">
        Anna Swan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/NQSWvyVRIJk)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(3, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: "60px",
    height: "60px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  typography: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
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
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: 300
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

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
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
function Quiz({history}) {
  const classes = useStyles();

  const { state, dispatch } = useContext(QuizContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/data`);
      dispatch({ type: "ADD_DATA", payload: response.data });
      let correct = response.data.map(({ id, correct }) => ({ id, correct }));
      dispatch({ type: "ADD_CORRECT_ANSWER", payload: correct });
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
  const countAnswer = () =>{
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

    let presentsAnswer = _.intersectionWith(correctValue, answerValue, _.isEqual);
    let differentAnswer = _.differenceWith(correctValue, answerValue, _.isEqual);
    console.log(presentsAnswer)
    console.log(differentAnswer)
    dispatch({ type: "SET_TRUE_ANSWER", payload: presentsAnswer});
    dispatch({ type: "SET_FALSE_ANSWER", payload: differentAnswer});
    history.push("/results")
  }

  const checkAnswer = e => {
    e.preventDefault();
    
    if (state.answers.length < state.correct.length) {
      handleOpen()
    } else {
        countAnswer()
    }
    // dispatch({ type: "RESET", payload: true });
  };

  

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
    {open && <Dialog countAnswer={countAnswer} open={open} handleOpen={handleOpen} handleClose={handleClose}/>}
    {console.log(state.answers)}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>Quiz</Avatar>
            <Typography component="h1" variant="h5">
              Lets do it!
            </Typography>
            <form className={classes.form} onSubmit={checkAnswer} noValidate>
              <div className="App">
                {state.data.length > 0 &&
                  state.data.map(({ question, answers, id, type}) => (
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
          <Box mt={16}>
            <Copyright />
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </QuizContext.Provider>
  );
}
export default withRouter(Quiz)