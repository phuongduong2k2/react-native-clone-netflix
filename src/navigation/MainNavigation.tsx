import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenNames from '../constants/ScreenNames';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import StartedScreen from '../screens/started';

import HomeScreen from '../screens/home';
import HomeNavigatorScreen from '../screens/home/HomeNavigatorScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.HomeNavigatorScreen}>
        <Stack.Screen
          name={ScreenNames.HomeNavigatorScreen}
          component={HomeNavigatorScreen}
          options={{headerShown: false, gestureEnabled: false}}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
