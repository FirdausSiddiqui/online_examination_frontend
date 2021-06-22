import { createSelector } from 'reselect';

const alertsList = (store, props) => store.alert?.alertsList;

export const getAlerts = createSelector(alertsList, (list) => {
  return list ? Object.keys(list).map((id) => ({ id, ...list[id] })) : [];
});
