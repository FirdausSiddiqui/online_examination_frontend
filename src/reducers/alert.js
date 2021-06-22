import { DE_ACTIVATE_ALERT, ACTIVATE_ALERT } from '../actions';

const initialState = {
  alertsList: {}
};

const alert = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIVATE_ALERT: {
      const { message, type: alertType, position, id } = payload;
      return {
        ...state,
        alertsList: {
          [id]: { message, type: alertType, position },
          ...state.alert
        }
      };
    }

    case DE_ACTIVATE_ALERT: {
      const { id } = payload;
      const newList = { ...state.alertsList };
      if (state.alertsList[id]) {
        delete newList[id];
      }
      return {
        ...state,
        alertsList: newList
      };
    }
    default:
      return state;
  }
};

export default alert;
