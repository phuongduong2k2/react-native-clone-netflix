/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainNavigation from './src/navigation/MainNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <MainNavigation />
      </GestureHandlerRootView>
    </Provider>
  );
}
export default App;
