import React, {useContext, useState,useEffect} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QuizContext from '../../context'
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    
  },
  summary:{
    backgroundColor:theme.palette.primary.main,
  },
  button:{
    marginRight: theme.spacing(2),
  }
}));


export default function SimpleExpansionPanel() {
  const [data, setData] = useState("");


useEffect(() => {
  if(localStorage.getItem('state')){
    const answersLocalStorage = localStorage.getItem('state');
    const quiz = JSON.parse(answersLocalStorage );
    setData(quiz.data)
    // const valueFromLocalStorage = answersLocalStorage.map(idLocal=>idLocal===id)
    // console.log("значение локал",valueFromLocalStorage)
  }
}, [])
  const classes = useStyles();
  const { state, dispatch } = useContext(QuizContext);
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.summary}
        >
          <Typography className={classes.heading}>SHOW RIGHT ANSWER</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {data.length>0 && data.map(({question,correct}) =>
           < div>  
           <p>{question}</p>
           {correct.map(answer=><Button variant="contained" className={classes.button} color="secondary">{answer}</Button>)}
           
           </div>
          

            )}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  
    </div>
  );
}