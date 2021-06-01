import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_BLANK_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION
} from '../actions';
import { questions } from '../selectors/questionData';

const useQuestions = () => {
  const dispatch = useDispatch();
  const questionList = useSelector(questions);
  const addBlankQuestion = useCallback(
    (questionItem) => {
      dispatch({
        type: ADD_BLANK_QUESTION,
        payload: questionItem
      });
    },
    [dispatch]
  );

  const updateQuestion = useCallback(
    (questionItem, questionIndex) => {
      dispatch({
        type: UPDATE_QUESTION,
        payload: questionItem,
        index: questionIndex
      });
    },
    [dispatch]
  );

  const deleteQuestion = useCallback(
    (questionIndex) => {
      dispatch({
        type: DELETE_QUESTION,
        index: questionIndex
      });
    },
    [dispatch]
  );

  return {
    questionList,
    addBlankQuestion,
    updateQuestion,
    deleteQuestion
  };
};

export default useQuestions;
