import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../components/AppContainer';
import {RouteProp, useRoute} from '@react-navigation/native';
import useAppNavigation, {
  RootStackParamList,
} from '../../navigation/useAppNavigation';
import AppButton from '../../components/AppButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import YoutubePlayer from 'react-native-youtube-iframe';
import AppHeader from '../../components/AppHeader';
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
import moment from 'moment';
import Space from '../../components/Space';
import {Source} from 'react-native-fast-image';
import ImageIcon from '../../components/ImageIcon';
import AppIcons from '../../constants/AppIcons';

interface Props {}
type WatchingScreenProps = RouteProp<RootStackParamList, 'WatchingScreen'>;

const widthScreen = Dimensions.get('screen').width;

let timeout: null | NodeJS.Timeout = null;

const styles = StyleSheet.create({
  viewAnim: {
    height: (widthScreen * 9) / 16,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  containYoutubePlayer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  containBody: {
    flex: 1,
    paddingHorizontal: AppDimention.secondPadding,
  },
  containNetflixSeries: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppDimention.secondPadding,
  },
  nNetflix: {
    resizeMode: 'contain',
    width: 12,
    height: undefined,
    aspectRatio: 54 / 96,
    marginRight: AppDimention.secondPadding / 2,
  },
  series: {
    fontFamily: AppFonts.bold,
    color: '#B7B7B7',
    fontSize: 13,
  },
  nameMovie: {
    fontFamily: AppFonts.medium,
    color: 'white',
    fontSize: 16,
  },

  btn: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 5,
  },
  textPlay: {
    fontFamily: AppFonts.medium,
    color: 'black',
    fontSize: 18,
  },
  textDownload: {
    fontFamily: AppFonts.medium,
    color: 'black',
    fontSize: 18,
  },
  iconBtn: {height: 25, width: 25},
  releaseDate: {
    color: 'white',
    fontSize: 11,
    fontFamily: AppFonts.medium,
  },
  descriptionMovie: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  summary: {
    fontSize: 14,
    color: 'white',
    fontFamily: AppFonts.bold,
  },
  containInspectMovie: {flexDirection: 'row', alignItems: 'center'},
});

const CustomSpace = () => <Space height={AppDimention.secondPadding} />;

type FuncBtnProps = {
  icon?: number | Source | undefined;
  title?: string;
  onPress?: () => {};
};

const FuncBtn = (props: FuncBtnProps): JSX.Element => {
  const {icon, onPress = () => {}, title = ''} = props;
  return (
    <TouchableOpacity
      style={{
        width: 40,
        alignItems: 'center',
      }}
      onPress={onPress}>
      <ImageIcon source={icon} />
      <Space height={4} />
      <Text
        style={{
          color: 'white',
          fontSize: 10,
          fontFamily: AppFonts.light,
        }}
        numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const WatchingScreen = (props: Props) => {
  const {} = props;
  const route = useRoute<WatchingScreenProps>();
  const movie = route.params;
  const navigation = useAppNavigation();
  const [displayLoading, setDisplayLoading] = useState(true);

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
    timeout = setTimeout(() => {
      setDisplayLoading(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(Number(timeout));
    };
  }, []);

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
              <ImageIcon source={AppIcons.x} />
            </TouchableOpacity>
          </>
        </AppHeader>
        <ScrollView>
          <View>
            {displayLoading && (
              <Animated.View style={[styles.viewAnim, animatedStyles]}>
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
            )}
            <View style={styles.containYoutubePlayer}>
              <YoutubePlayer
                height={(widthScreen * 9) / 16}
                play={false}
                onReady={onChangeStateTrailer}
                videoId={movie.trailerId ?? ''}
              />
            </View>
          </View>
          <View style={styles.containBody}>
            <View style={styles.containNetflixSeries}>
              <Image source={AppImages.nNetflix} style={styles.nNetflix} />
              <Text style={styles.series}>SERIES</Text>
            </View>
            <Text style={styles.nameMovie}>{movie.name}</Text>
            <View style={styles.containInspectMovie}>
              <Text style={styles.releaseDate}>
                {moment(movie.releasedYear).format('MMM YYYY')}
              </Text>
              <Space width={4} />
              {/* <AppIconsSVG.badge_vision /> */}
              <Space width={4} />
              {/* <AppIconsSVG.badge_hd /> */}
              <Space width={4} />
              {/* <AppIconsSVG.badge_ad /> */}
            </View>
            <CustomSpace />
            {/* <AppButton
              style={styles.btn}
              Icon={AppIconsSVG.play}
              iconStyles={{...styles.iconBtn, fill: 'black'}}
              text={'Play'}
              textStyle={styles.textPlay}
            /> */}
            <CustomSpace />
            {/* <AppButton
              style={styles.btn}
              Icon={AppIconsSVG.downloads}
              iconStyles={{...styles.iconBtn, fill: 'black'}}
              text={'Download'}
              disable={true}
              textStyle={styles.textDownload}
            /> */}
            <CustomSpace />
            <Text style={styles.summary}>Summary</Text>
            <Text style={styles.descriptionMovie}>{movie.description}</Text>
            <View
              style={{
                marginTop: AppDimention.mainPadding,
                flexDirection: 'row',
              }}>
              <FuncBtn icon={AppIcons.plus} title="My List" />
              <Space width={AppDimention.mainPadding * 2} />
              <FuncBtn icon={AppIcons.thumbs_up} title="Rate" />
              <Space width={AppDimention.mainPadding * 2} />
              <FuncBtn icon={AppIcons.paper_plane_tilt} title="Share" />
            </View>
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
};

export default WatchingScreen;
