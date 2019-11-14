import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import QuizContext from '../../context'



export default function Results() {

  const { state} = useContext(QuizContext);

  return (

     
        <Typography variant="h2" component="h1" gutterBottom>
          Congratulation!
          You have {state.trueAnswer.length} correct answer!
          You are genius!
        </Typography>


  );
}