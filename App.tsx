import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import MainNavigation from './src/navigation/MainNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const onChangeColoNavigationBar = async () => {
    try {
      changeNavigationBarColor('black');
    } catch (error) {
      console.log('[change color navigation]', error);
    }
  };

  useEffect(() => {
    onChangeColoNavigationBar();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{backgroundColor: 'black'}}>
        <GestureHandlerRootView>
          <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
          <MainNavigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
