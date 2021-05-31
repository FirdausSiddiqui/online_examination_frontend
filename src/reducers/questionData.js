import { ADD_BLANK_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from '../actions';
import { initialStore } from './appData';


const questionData = (store = initialStore, action) => {
  const { type, payload, index } = action;

  switch(type){
    case ADD_BLANK_QUESTION: {
      return {
        ...store,
        questions: [...store.questions, payload]
      };
    }
    case UPDATE_QUESTION: {
      let newQuestions = [...store.questions];
      newQuestions[index] = payload;
      return{
        ...store,
        questions: newQuestions
      };
    }
    case DELETE_QUESTION: {
      let newQuestions = [...store.questions];
      newQuestions.splice(index, 1);
      return{
        ...store,
        questions: newQuestions
      };
    } 
    default:
      return store;
  }
}

export default questionData;