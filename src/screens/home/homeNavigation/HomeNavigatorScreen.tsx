import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import SearchScreen from '../../search';
import ComingSoonScreen from '../../coming';
import DownloadsScreen from '../../downloads';
import MoreScreen from '../../more';
import ScreenNames from '../../../constants/ScreenNames';
import {AppIcons} from '../../../constants/AppIcons';

import {AppFonts} from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';

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

// interface TabBarIconProps {
//   focused: boolean;
//   color: string;
//   size: number;
// }

const HomeNavigatorScreen = () => {
  const customTabBar = (props: BottomTabBarProps) => {
    const {navigation, state} = props;
    return (
      <View {...props} style={{height: 50, backgroundColor: 'black'}}>
        <View
          style={{
            height: 10,
            width: '100%',
            position: 'absolute',
            borderColor: 'orange',
            top: -10,
          }}>
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={{
              height: '100%',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {state.routes.map((route, index) => {
            const Icon = listTab[index].Icon;
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  alignItems: 'center',
                  width: '20%',
                }}
                key={route.key}
                onPress={() => {
                  navigation.navigate(route.name);
                }}>
                <Icon fill={state.index === index ? 'white' : '#737373'} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: AppFonts.regular,
                    color: state.index === index ? 'white' : '#737373',
                  }}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTabBarIcon = ({focused, data}: any) => {
    return <data.Icon fill={focused ? 'white' : '#737373'} />;
  };

  return (
    <Tab.Navigator
      tabBar={customTabBar}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#010101', borderColor: 'black'},
        // tabBarButton: props => (
        //   <TouchableOpacity>
        //     <Text>asd</Text>
        //   </TouchableOpacity>
        // ),
        tabBarLabelStyle: {fontFamily: AppFonts.regular},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#737373',
      }}
      initialRouteName={ScreenNames.HomeScreen}>
      {listTab.map(item => {
        return (
          <Tab.Screen
            name={item.name}
            key={item.id}
            component={item.component}
            options={{
              tabBarIcon: props => {
                return renderTabBarIcon({...props, data: item});
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default HomeNavigatorScreen;
