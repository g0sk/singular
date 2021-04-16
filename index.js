/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';
import {initialize} from './src/core/helpers/helpers';

//Axios interceptors
initialize();

AppRegistry.registerComponent(appName, () => App);
