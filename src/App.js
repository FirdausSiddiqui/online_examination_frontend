import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import RootRoute from './routes';
import Alert from './components/Alert';

const App = () => {
  return (
    <Provider store={store}>
      <RootRoute />
      <Alert />
    </Provider>
  );
};

export default App;
