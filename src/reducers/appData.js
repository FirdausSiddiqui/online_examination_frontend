import {
  TOGGLE_DRAWER,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  ROUTE_CHANGE
} from '../actions';

export const initialStore = {
  isDrawerOpen: false,
  routeChange: false,
  user: {
    name: 'Rohit Mondal',
    sem: 1,
    type: 'student',
    dept: 'CSE',
    roll: 1
  }
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

    default: {
      return store;
    }
  }
};

export default appData;
