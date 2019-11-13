import React, { useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import Quiz from "./Quiz.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import quizReducer from "./reducer";
import QuizContext from "./context";
import Results from './Views/Results/Results'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#E0F2F1",
      main: "#018786"
    },
    secondary: {
      main: "#3700B3"
    }
  }
});
const customHistory = createBrowserHistory();

const App = () => {
  const initialState = useContext(QuizContext);
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <Router history={customHistory}>
    <QuizContext.Provider value={{ state, dispatch }}>
    <Switch>
          <Route path="/results">
            <Results/>
          </Route>
          <Route path="/">
          <Quiz />
          </Route>
        </Switch> 
    </QuizContext.Provider>
    </Router>
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

