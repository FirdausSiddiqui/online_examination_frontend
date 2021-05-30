import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import RootRoute from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <RootRoute />
    </Provider>
  );
};

export default App;
