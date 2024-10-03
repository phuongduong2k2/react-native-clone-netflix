import {TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';

import ComingSoonScreen from '../screens/coming';
import DownloadsScreen from '../screens/downloads';
import MoreScreen from '../screens/more';
import ScreenNames from '../constants/ScreenNames';

import {AppFonts} from '../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import ImageIcon from '../components/ImageIcon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import SearchScreen from '../screens/search/SearchScreen';
import AppIcons from '../constants/AppIcons';

const listTab = [
  {
    id: 0,
    name: 'Home',
    icon: {
      active: AppIcons.home_active,
      inactive: AppIcons.home,
    },
    color: '#E50914',
    component: HomeScreen,
  },
  {
    id: 1,
    name: 'Search',
    icon: {
      active: AppIcons.search_active,
      inactive: AppIcons.search,
    },
    color: '#0E7ADD',
    component: SearchScreen,
  },
  {
    id: 2,
    name: 'Hot & New',
    icon: {
      active: AppIcons.media_active,
      inactive: AppIcons.media,
    },
    color: '#00FF0A',
    component: ComingSoonScreen,
  },
  {
    id: 3,
    name: 'Downloads',
    icon: {
      active: AppIcons.download_active,
      inactive: AppIcons.download,
    },
    color: '#AC09E5',
    component: DownloadsScreen,
  },
  {
    id: 4,
    name: 'More',
    icon: {
      active: AppIcons.more_active,
      inactive: AppIcons.more,
    },
    color: '#E5A709',
    component: MoreScreen,
  },
];

const Tab = createBottomTabNavigator();

// interface TabBarIconProps {
//   focused: boolean;
//   color: string;
//   size: number;
// }

type ItemTabAnimProps = {
  route: any;
  index: number;
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const ItemTabAnim = (props: ItemTabAnimProps) => {
  const {route, index, state, navigation} = props;
  const anim = useSharedValue(0);
  const animActiveStyles = useAnimatedStyle(() => ({
    opacity: anim.value,
    zIndex: 1,
  }));

  const animName = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 1], [0.3, 1]),
  }));

  useEffect(() => {
    if (state.index === index) {
      anim.value = withTiming(1);
    } else {
      anim.value = withTiming(0);
    }
  }, [state]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        height: '100%',
      }}
      onPress={() => {
        navigation.navigate(route.name);
      }}>
      <View style={{height: 30, width: 30}}>
        <Animated.View
          style={[
            animActiveStyles,
            {
              height: 30,
              width: 30,
            },
          ]}>
          <ImageIcon source={listTab[index].icon.active} />
        </Animated.View>
        <View style={{position: 'absolute', opacity: 0.3}}>
          <ImageIcon source={listTab[index].icon.inactive} />
        </View>
      </View>
      <Animated.Text
        style={[
          {
            fontSize: 12,
            fontFamily: AppFonts.bold,
            color: 'white',
          },
          animName,
        ]}>
        {route.name}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const HomeNavigator = () => {
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
            return (
              <ItemTabAnim
                navigation={navigation}
                state={state}
                route={route}
                index={index}
                key={route.key}
              />
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

export default HomeNavigator;
