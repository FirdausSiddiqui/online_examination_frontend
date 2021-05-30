import { combineReducers } from 'redux';
import AppDataReducer from './appData';

const appReducer = combineReducers({
  appData: AppDataReducer
});

const rootReducer = (store, action) => {
  const { type } = action;
  let storeObj = appReducer(store, action);
  return storeObj;
};

export default rootReducer;
