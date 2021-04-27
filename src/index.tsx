import React from 'react';
import {AuthProvider} from './core/auth/index';
import {RootNavigator} from 'navigation/RootNavigator';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import {initialize} from 'helpers/general';

const App = () => {
  initialize();
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;
