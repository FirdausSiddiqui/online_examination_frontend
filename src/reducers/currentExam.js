import { GET_CURRENT_EXAM } from '../actions';

export const initialStore = {
  examDetails: {}
};

const currentExam = (store = initialStore, action) => {
  const { type } = action;

  switch (type) {
    case GET_CURRENT_EXAM: {
      return {
        ...store,
        examDetails: action.payload
      };
    }
    default:
      return store;
  }
};

export default currentExam;
