import { createSelector } from 'reselect';

const storeDrawerStatus = (store, props) => store.appData.isDrawerOpen;
const storeUser = (store, props) => store.appData.user;

export const isDrawerOpen = createSelector(
  storeDrawerStatus,
  (status) => status
);

export const currentUser = createSelector(
  storeUser,
  (currentUser) => currentUser
);
