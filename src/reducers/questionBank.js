import { GET_QUESTION_BANK, SET_CURRENT_QUESTION } from '../actions';

export const initialStore = {
  allQuestions: [],
  currentQuestion: {}
};

const questionBank = (store = initialStore, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTION_BANK: {
      return {
        ...store,
        allQuestions: payload
      };
    }
    case SET_CURRENT_QUESTION: {
      return {
        ...store,
        currentQuestion: payload
      };
    }
    default:
      return store;
  }
};

export default questionBank;
