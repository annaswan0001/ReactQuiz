import React from "react";

const TodosContext = React.createContext({
  answers: [],
  data:[],
  correct:[],
  reset:false,
  trueAnswer:[],
  falseAnswer:[]
});

export default TodosContext;
