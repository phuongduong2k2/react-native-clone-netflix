import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '..';
import SearchScreen from '../../search';
import ComingSoonScreen from '../../coming';
import DownloadsScreen from '../../downloads';
import MoreScreen from '../../more';
import ScreenNames from '../../../constants/ScreenNames';
import {AppIcons} from '../../../constants/AppIcons';
import AppSvg from '../../../components/AppSvg';
import {AppFonts} from '../../../constants/constants';

const listTab = [
  {
    id: 0,
    name: 'Home',
    Icon: AppIcons.home,
    component: HomeScreen,
  },
  {
    id: 1,
    name: 'Search',
    Icon: AppIcons.search,
    component: SearchScreen,
  },
  {
    id: 2,
    name: 'Coming Soon',
    Icon: AppIcons.comingSoon,
    component: ComingSoonScreen,
  },
  {
    id: 3,
    name: 'Downloads',
    Icon: AppIcons.downloads,
    component: DownloadsScreen,
  },
  {
    id: 4,
    name: 'More',
    Icon: AppIcons.more_stick,
    component: MoreScreen,
  },
];

const Tab = createBottomTabNavigator();

const HomeNavigatorScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'green'},
        // tabBarButton: props => (
        //   <TouchableOpacity>
        //     <Text>asd</Text>
        //   </TouchableOpacity>
        // ),
        tabBarIcon: () => <View />,
        tabBarLabelStyle: {fontFamily: AppFonts.regular},
        tabBarActiveTintColor: 'white',
      }}
      initialRouteName={ScreenNames.HomeScreen}>
      {listTab.map(item => {
        return (
          <Tab.Screen
            name={item.name}
            key={item.id}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) => {
                return <item.Icon fill={focused ? 'white' : 'black'} />;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default HomeNavigatorScreen;
