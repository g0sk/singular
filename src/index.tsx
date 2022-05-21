import React, {useEffect} from 'react';
import {AuthProvider} from './core/auth/index';
import {RootNavigator} from 'navigation/navigators/RootNavigator';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import {ThemeProvider} from './ui/theme';
import {initialize} from 'helpers/general';
import {setI18nConfig} from 'core';
import RNBootSplash from 'react-native-bootsplash';
import {enableScreens} from 'react-native-screens';

const App = () => {
  useEffect(() => {
    //Use native nativigation component (FragmentActivity) for navigation-screens
    enableScreens();
    initialize();
    setI18nConfig();
    //Delay so login screen is not displayed when navigator is loaded
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1500);
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
