import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

type Props = {};

const RNNotification = (props: Props) => {
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

  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'Misca',
      name: 'Misca Notificasdfasdfations',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    // Display a notification
    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        sound: 'default',
        importance: AndroidImportance.HIGH,
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      console.log(status, settings);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification();
    });

    return unsubscribe;
  }, []);

  return <></>;
};

export default RNNotification;
