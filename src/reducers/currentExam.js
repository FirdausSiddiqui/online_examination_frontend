import { GET_CURRENT_EXAM, UPDATE_CURRENT_EXAM_MARKS } from '../actions';

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
    case UPDATE_CURRENT_EXAM_MARKS: {
      return {
        ...store,
        examDetails: {
          ...store.examDetails,
          marks: [...store.examDetails.marks, action.payload],
          examTaken: true
        }
      };
    }
    default:
      return store;
  }
};

export default currentExam;
