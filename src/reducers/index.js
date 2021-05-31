import { combineReducers } from 'redux';
import AppDataReducer from './appData';
import QuestionDataReducer from './questionData';

const appReducer = combineReducers({
  appData: AppDataReducer,
  questionData: QuestionDataReducer
});

const rootReducer = (store, action) => {
  const { type } = action;
  let storeObj = appReducer(store, action);
  return storeObj;
};

export default rootReducer;
