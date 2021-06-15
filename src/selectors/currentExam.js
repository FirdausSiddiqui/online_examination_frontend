import { createSelector } from 'reselect';

const storeCurrentExam = (store, props) => store.currentExam.examDetails;
const storeCurrentExamQuestions = (store, props) =>
  store.questionBank.allQuestions[1];

export const currentExam = createSelector(storeCurrentExam, (data) => data);
export const currentExamQuestions = createSelector(
  storeCurrentExamQuestions,
  (data) => data
);
