import { GET_QUESTION_BANK } from '../actions';

export const initialStore = {
  allQuestions: []
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
    default:
      return store;
  }
};

export default questionBank;
