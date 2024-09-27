import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import ScreenNames from '../constants/ScreenNames';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import StartedScreen from '../screens/started';
import WatchingScreen from '../screens/watching/WatchingScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';
import SplashScreen from '../screens/splash/SplashScreen';
import {StackCardStyleInterpolator} from '@react-navigation/stack/lib/typescript/src/types';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

const themeColor = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

const forFade: StackCardStyleInterpolator = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MainNavigation: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingBottom: insets.bottom}}>
      <NavigationContainer theme={themeColor}>
        <Stack.Navigator initialRouteName={ScreenNames.SplashScreen}>
          <Stack.Screen
            name={ScreenNames.SplashScreen}
            component={SplashScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={ScreenNames.HomeNavigator}
            component={HomeNavigator}
            options={{
              headerShown: false,
              gestureEnabled: false,
              cardStyleInterpolator: forFade,
            }}
          />
          <Stack.Screen
            name={ScreenNames.LoginScreen}
            component={LoginScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name={ScreenNames.RegisterScreen}
            component={RegisterScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name={ScreenNames.StartedScreen}
            component={StartedScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name={ScreenNames.WatchingScreen}
            component={WatchingScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen
            name={ScreenNames.ProfileScreen}
            component={ProfileScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainNavigation;
