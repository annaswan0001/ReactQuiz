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
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            answers: newAnswers
          })
        );
        return {
          ...state,
          answers: newAnswers
        };
      } else {
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            answers: [...state.answers, action.payload]
          })
        );
        return {
          ...state,
          answers: [...state.answers, action.payload]
        };
      }
    case "ADD_DATA":
      localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            data: action.payload
          })
        );
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
      return {
        ...state,
        reset: action.payload,
        answers: []
      };
    case "SET_TRUE_ANSWER":
      return {
        ...state,
        trueAnswer: action.payload
      };
    case "SET_FALSE_ANSWER":
      return {
        ...state,
        falseAnswer: action.payload
      };
    default:
      return state;
  }
}
