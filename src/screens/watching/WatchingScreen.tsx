import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import {RouteProp, useRoute} from '@react-navigation/native';
import useAppNavigation, {
  RootStackParamList,
} from '../../navigation/useAppNavigation';
import AppButton from '../../components/AppButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import YoutubePlayer from 'react-native-youtube-iframe';
import AppHeader from '../../components/AppHeader';
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';
import AppImages from '../../constants/AppImages';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {}
type WatchingScreenProps = RouteProp<RootStackParamList, 'WatchingScreen'>;

const widthScreen = Dimensions.get('screen').width;

const WatchingScreen = (props: Props) => {
  const {} = props;
  const route = useRoute<WatchingScreenProps>();
  const {name, trailerVideoId} = route.params;
  const navigation = useAppNavigation();

  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // animation
  const opacity = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onChangeStateTrailer = () => {
    opacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      reduceMotion: ReduceMotion.System,
    });
  };

  return (
    <AppContainer>
      <View style={{flex: 1, marginTop: insets.top}}>
        <AppHeader
          containerStyle={{backgroundColor: 'transparent'}}
          title={'Watching'}
          textStyles={{color: 'white', fontFamily: AppFonts.bold}}>
          <></>
          <>
            <TouchableOpacity onPress={goBack}>
              <AppIcons.close fill="white" />
            </TouchableOpacity>
          </>
        </AppHeader>
        <View>
          <Animated.View
            style={[
              {
                height: (widthScreen * 9) / 16,
                width: '100%',
                position: 'absolute',
                zIndex: 1,
              },
              animatedStyles,
            ]}>
            <SkeletonPlaceholder
              backgroundColor="rgb(65, 65, 65)"
              highlightColor="rgb(134, 134, 134)"
              borderRadius={4}
              speed={1500}>
              <SkeletonPlaceholder.Item
                height={'100%'}
                width={'100%'}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                overflow="hidden"
              />
            </SkeletonPlaceholder>
          </Animated.View>
          <Animated.View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
            }}>
            <YoutubePlayer
              height={(widthScreen * 9) / 16}
              play={false}
              onReady={onChangeStateTrailer}
              videoId={trailerVideoId ?? ''}
            />
          </Animated.View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: AppDimention.secondPadding,
            marginTop: AppDimention.secondPadding,
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={AppImages.nNetflix}
              style={{
                resizeMode: 'contain',
                width: 15,
                height: undefined,
                aspectRatio: 54 / 96,
                marginRight: AppDimention.secondPadding / 2,
              }}
            />
            <Text
              style={{
                fontFamily: AppFonts.bold,
                color: '#B7B7B7',
                fontSize: 13,
              }}>
              SERIES
            </Text>
          </View>
          <Text
            style={{
              fontFamily: AppFonts.medium,
              color: 'white',
              fontSize: 16,
            }}>
            {name}
          </Text>
          <AppButton
            style={{
              backgroundColor: 'white',
              height: 48,
              borderRadius: 5,
              marginVertical: AppDimention.secondPadding,
            }}
            Icon={AppIcons.play}
            iconStyles={{height: 25, width: 25, fill: 'black'}}
            text={'Play'}
            // disable={true}
            textStyle={{
              fontFamily: AppFonts.medium,
              color: 'black',
              fontSize: 18,
            }}
          />
          <AppButton
            style={{
              backgroundColor: 'white',
              height: 48,
              borderRadius: 5,
            }}
            Icon={AppIcons.downloads}
            iconStyles={{height: 25, width: 25, fill: 'black'}}
            text={'Download'}
            disable={true}
            textStyle={{
              fontFamily: AppFonts.medium,
              color: 'black',
              fontSize: 18,
            }}
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default WatchingScreen;
