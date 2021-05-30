import { createSelector } from 'reselect';

const storeDrawerStatus = (store, props) => store.appData.isDrawerOpen;

export const isDrawerOpen = createSelector(
  storeDrawerStatus,
  (status) => status
);
