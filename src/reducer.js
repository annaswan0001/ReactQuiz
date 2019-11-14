export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_CURRENT_ANSWER":
      const updatedAnswer = action.payload;
      const updatedAnswerIndex = state.answers.findIndex(
        t => t.id == action.payload.id
      );
      if (updatedAnswerIndex > -1) {
        const newAnswers = [
          ...state.answers.slice(0, updatedAnswerIndex),
          updatedAnswer,
          ...state.answers.slice(updatedAnswerIndex + 1)
        ];
        if(action.payload){
          localStorage.setItem(
            "state",
            JSON.stringify({
              ...state,
              answers: newAnswers
            })
          );
        } 
        return {
          ...state,
          answers: newAnswers
        };
      } else {
        if (updatedAnswerIndex <= -1){
          if(action.payload){
            localStorage.setItem(
              "state",
              JSON.stringify({
                ...state,
                answers: [...state.answers, action.payload]
              })
            );
          } 
        }
        return {
          ...state,
          answers: [...state.answers, action.payload]
        };
      }
    case "ADD_DATA":
      return {
        ...state,
        data: action.payload
      };
    case "ADD_CORRECT_ANSWER":
      return {
        ...state,
        correct: action.payload
      };
    case "RESET":
      if (action.payload){

        return {
        ...state,
        reset: action.payload,
        answers: []
      }
      }else{
        return {
          ...state,
          reset: action.payload,
          }
      };
    case "SET_TRUE_ANSWER":
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            trueAnswer: action.payload
          })
        );
      return {
        ...state,
        trueAnswer: action.payload
      };
    case "SET_FALSE_ANSWER":
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
        falseAnswer: action.payload
          })
        );
      return {
        ...state,
        falseAnswer: action.payload
      };
    default:
      return state;
  }
}
