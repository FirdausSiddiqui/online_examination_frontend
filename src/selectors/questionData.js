import { createSelector } from 'reselect';

const storeQuestions = (store, props) => store.questionData.questions;

export const questions = createSelector(storeQuestions, (data) => data);
