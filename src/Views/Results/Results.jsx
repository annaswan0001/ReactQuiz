import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import QuizContext from "../../context";
import BadMark from "./BadMark";
import GoodMark from "./GoodMark";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import Answers from './Answer.jsx'



const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundImage: "url(https://source.unsplash.com/HzaT5l4Fzqc)",
    backgroundSize:"cover"
  },
  
  
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white"
  },
  button:{
      display:"block",
      marginBottom: theme.spacing(4),
  }
}));

function Results({history}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(QuizContext);


  const goHome = ()=>{
      
      dispatch({ type: "RESET", payload: true });
      history.push('/')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">        
         {/* {state.correct.length === 0 && (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )} */}
          {state.trueAnswer.length === state.correct.length ? (
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
        
        <Answers/>
      </Container>
    </div>
  );
}
export default withRouter(Results)