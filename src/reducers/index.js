import { combineReducers } from 'redux';
import AppDataReducer from './appData';
import QuestionDataReducer from './questionData';
import CurrentExamReducer from './currentExam';
import QuestionBankReducer from './questionBank';

const appReducer = combineReducers({
  appData: AppDataReducer,
  questionData: QuestionDataReducer,
  currentExam: CurrentExamReducer,
  questionBank: QuestionBankReducer
});

const rootReducer = (store, action) => {
  const { type } = action;
  let storeObj = appReducer(store, action);
  return storeObj;
};

export default rootReducer;
