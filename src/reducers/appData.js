import { TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER } from '../actions';

const initialStore = {
  isDrawerOpen: false
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
    default: {
      return store;
    }
  }
};

export default appData;