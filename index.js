/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './js/App'
// import AppNavigator from './js/navigator/AppNavigator'
// import { createAppContainer } from 'react-navigation';

// // 导航器需要包裹到容器里才能正确使用。
//  const AppContainer = createAppContainer(AppNavigator)
AppRegistry.registerComponent(appName, () => App);
