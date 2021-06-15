import { createSelector } from 'reselect';

const storeCurrentQuestion = (store, props) =>
  store.questionBank.currentQuestion;

export const currentQuestion = createSelector(
  storeCurrentQuestion,
  (data) => data
);
