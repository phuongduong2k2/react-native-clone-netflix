import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';

import MainNavigation from './src/navigation/MainNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {requestNotifications} from 'react-native-permissions';

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

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enable =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enable) {
      console.log('Authorization status: ', authStatus);
    }
  };

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token FCM: ', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      console.log(status, settings);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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
