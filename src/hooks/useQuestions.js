import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ADD_BLANK_QUESTION, DELETE_QUESTION, UPDATE_QUESTION } from "../actions";

const useQuestions = () => {
  const dispatch = useDispatch(); 
  const addBlankQuestion = useCallback((questionItem) => {
    dispatch({
      type: ADD_BLANK_QUESTION,
      payload: questionItem
    })
  }, [dispatch]);

  const updateQuestion = useCallback((questionItem, questionIndex) => {
    dispatch({
      type: UPDATE_QUESTION,
      payload: questionItem,
      index: questionIndex
    })
  }, [dispatch]);

  const deleteQuestion = useCallback((questionItem, questionIndex) => {
    dispatch({
      type: DELETE_QUESTION,
      payload: questionItem,
      index: questionIndex
    })
  }, [dispatch]);
  
  return {
    addBlankQuestion,
    updateQuestion,
    deleteQuestion
  }
};

export default useQuestions;