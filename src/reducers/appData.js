import {
  TOGGLE_DRAWER,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  ROUTE_CHANGE,
  SET_USER_DETAILS,
  RESET_USER,
  UPDATE_CURRENT_EXAM_MARKS
} from '../actions';

export const initialStore = {
  isDrawerOpen: false,
  routeChange: false,
  user: {}
};

const appData = (store = initialStore, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_DRAWER: {
      return {
        ...store,
        isDrawerOpen: !store.isDrawerOpen
      };
    }

    case OPEN_DRAWER: {
      return {
        ...store,
        isDrawerOpen: true
      };
    }

    case CLOSE_DRAWER: {
      return {
        ...store,
        isDrawerOpen: false
      };
    }

    case ROUTE_CHANGE: {
      return {
        ...store,
        routeChange: true
      };
    }

    case SET_USER_DETAILS: {
      return {
        ...store,
        user: action.payload
      };
    }

    case RESET_USER: {
      return {
        ...store,
        user: {}
      };
    }

    case UPDATE_CURRENT_EXAM_MARKS: {
      return {
        ...store,
        user: {
          ...store.user,
          currentExamMarks: action.payload.mark
        }
      };
    }

    default: {
      return store;
    }
  }
};

export default appData;
