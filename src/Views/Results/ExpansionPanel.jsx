import React, {useContext, useState,useEffect} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import { useStyles } from './ExpansionPanelStyle.js';

import QuizContext from '../../context'




export default function SimpleExpansionPanel() {
  const [data, setData] = useState("");
  const [falseAnswer, setFalseAnswer] = useState("");

useEffect(() => {
  if(localStorage.getItem('state')){
    const answersLocalStorage = localStorage.getItem('state');
    const quiz = JSON.parse(answersLocalStorage );
    setData(quiz.data)
    setFalseAnswer(quiz.falseAnswer)
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
          {falseAnswer.length>0 && <p className={classes.wrongAnswer}>You wrong answers are:</p>}
          {falseAnswer.length>0 && falseAnswer.map(({id})=><span>{id},</span>)}
          <p >Correct answers:</p>
            {data.length>0 && data.map(({question,correct,id}) =>
           < div>  
           <p>{id}.{question}</p>
           {correct.map(answer=><Button key={answer.id} variant="contained" className={classes.button} color="secondary">{answer}</Button>)}
           
           </div>
          

            )}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  
    </div>
  );
}