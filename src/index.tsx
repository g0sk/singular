import React, {useEffect} from 'react';
import {AuthProvider} from './core/auth/index';
import {RootNavigator} from 'navigation/RootNavigator';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import {ThemeProvider} from './ui/Theme';
import {initialize} from 'helpers/general';
import {setI18nConfig} from 'core';

const App = () => {
  useEffect(() => {
    initialize();
    setI18nConfig();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
