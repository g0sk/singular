import React, {useEffect} from 'react';
import {AuthProvider} from './core/auth/index';
import {RootNavigator} from 'navigation/RootNavigator';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import {ThemeProvider} from './ui/theme';
import {initialize} from 'core/auth/interceptors';
import {setI18nConfig} from 'core';
import RNBootSplash from 'react-native-bootsplash';
import {enableScreens} from 'react-native-screens';
import {NfcProvider} from 'core/nfc';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  useEffect(() => {
    //Use native nativigation component (FragmentActivity) for navigation-screens
    const askPermissions = async () => {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      } catch (e) {}
    };
    enableScreens();
    initialize();
    askPermissions();
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
          <NfcProvider>
            <RootNavigator />
          </NfcProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
