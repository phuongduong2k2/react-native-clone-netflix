import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppImages from '../../constants/AppImages';
import AppSvg from '../../components/AppSvg';
import {AppIcons, AppIconsSVG} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import TagAge from '../../components/TagAge';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import ContiWatchItem from '../components/ContiWatchItem';
import PreviewItem from '../components/PreviewItem';
import MovieCard from '../components/MovieCard';
import {MovieItemProps} from '../../types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppActions} from '../../redux/slice/AppSlice';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useAppNavigation from '../../navigation/useAppNavigation';
import {API} from '../../api/api';
import {useSelector} from 'react-redux';
import LazyImage from '../../components/LazyImage';
import ImageIcon from '../../components/ImageIcon';

const styles = StyleSheet.create({
  container: {width: '100%', position: 'absolute', zIndex: 0},
  containHeader: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
  },
  containNNetflix: {
    marginVertical: AppDimention.secondPadding,
    marginLeft: AppDimention.secondPadding,
  },
  imgNNetflix: {
    resizeMode: 'contain',
    aspectRatio: 18 / 32,
    height: '100%',
    width: undefined,
  },
  touchCategory: {
    paddingHorizontal: 4,
    marginHorizontal: AppDimention.secondPadding,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    flexDirection: 'row',
  },
  linearHeaderPoster: {
    height: '25%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  imgMoviesPoster: {
    resizeMode: 'contain',
    width: '100%',
    aspectRatio: 760 / 1080,
    height: undefined,
    zIndex: 0,
  },
  linearFooterPoster: {
    height: '25%',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});

const SpaceLine = () => <View style={{width: 8}} />;
const SeparatorWidth = () => <View style={{width: 16}} />;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [popularMovies, setPopularMovies] = useState<MovieItemProps[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<MovieItemProps[]>([]);
  const {userInfo, token} = useAppSelector(state => state.app);

  const mainFilmPoster = AppImages.posters.dune;

  const onPressMovie = (data: MovieItemProps) => {
    navigation.navigate('WatchingScreen', data);
  };

  const getPopularMovies = async () => {
    const res: any = await API.getPopularMovies(token ?? '');
    if (res?.status === 200) {
      setPopularMovies(res?.data?.data);
    }
  };

  const getTrendingMovies = async () => {
    const res: any = await API.getTrendingMovies(token ?? '');
    if (res?.status === 200) {
      setTrendingMovies(res?.data?.data);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getTrendingMovies();
  }, [userInfo, token]);

  const renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <View style={styles.containHeader}>
          <View style={styles.containNNetflix}>
            <Image source={AppImages.nNetflix} style={styles.imgNNetflix} />
          </View>
          <View
            style={{
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: AppDimention.secondPadding / 2,
            }}>
            <TouchableOpacity
              style={{
                padding: AppDimention.secondPadding / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                console.log(userInfo);
              }}>
              <ImageIcon source={AppIcons.screen_cast} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: AppDimention.secondPadding / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}>
              <LazyImage
                source={
                  userInfo
                    ? userInfo?.avatar
                    : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                }
                styles={{height: '60%', width: undefined, aspectRatio: 1}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity style={styles.touchCategory}>
            <Text style={{color: 'white', fontFamily: AppFonts.light}}>
              TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchCategory}>
            <Text style={{color: 'white', fontFamily: AppFonts.light}}>
              Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchCategory}>
            <Text style={{color: 'white', fontFamily: AppFonts.light}}>
              Categories
            </Text>
            <View style={{height: '80%', aspectRatio: 1, width: undefined}}>
              <ImageIcon
                source={AppIcons.caret_down}
                style={{height: '100%', width: undefined, aspectRatio: 1}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMainFilm = () => {
    return (
      <View
        style={{
          aspectRatio: 760 / 1080,
          width: '100%',
          height: undefined,
          flexDirection: 'row',
        }}>
        <View
          style={{
            alignSelf: 'flex-end',
            height: '40%',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.medium,
              fontSize: 45,
            }}>
            Dune
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: AppDimention.mainPadding,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: AppFonts.regular,
                textAlign: 'center',
              }}>
              2021 |
            </Text>
            <TagAge />
            <Text
              style={{
                color: 'white',

                fontFamily: AppFonts.regular,
                textAlign: 'center',
              }}>
              | 2h 35m | Sci-Fi
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{alignItems: 'center', width: 56}}
              onPress={() => {
                dispatch(AppActions.decrement());
              }}>
              <ImageIcon source={AppIcons.plus} />
              <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
                My List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                marginHorizontal: AppDimention.mainPadding,
                borderRadius: 5,
                paddingVertical: 4,
                paddingHorizontal: AppDimention.secondPadding,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppSvg SvgSrc={AppIconsSVG.play} size={30} fill="black" />
              <Text
                style={{
                  fontFamily: AppFonts.medium,
                  color: 'black',
                  marginLeft: 8,
                  fontSize: 18,
                }}>
                Play
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', width: 56}}
              onPress={() => {
                dispatch(AppActions.increment());
              }}>
              <ImageIcon source={AppIcons.warning_circle} />
              <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
                Info
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderContiWatchItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <ContiWatchItem data={item} />;
  };

  const renderContiWatch = () => {
    return (
      <View style={{backgroundColor: ''}}>
        <Text
          style={{
            color: 'white',
            fontFamily: AppFonts.medium,
            fontSize: 20,
            marginLeft: 8,
          }}>
          Continue Watching for Ellie
        </Text>
        <View style={{marginTop: AppDimention.secondPadding}}>
          <FlashList
            data={[]}
            keyExtractor={item => item.name}
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
            ItemSeparatorComponent={SpaceLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderContiWatchItem}
            estimatedItemSize={106}
          />
        </View>
      </View>
    );
  };

  const renderPreviewItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <PreviewItem data={item} />;
  };

  const renderPreview = () => {
    return (
      <View>
        <Text
          style={{
            color: 'white',
            fontFamily: AppFonts.medium,
            fontSize: 20,
            marginLeft: 8,
          }}>
          Previews
        </Text>
        <View style={{marginTop: AppDimention.secondPadding}}>
          <FlashList
            data={[]}
            keyExtractor={item => item.name}
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
            ItemSeparatorComponent={SeparatorWidth}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderPreviewItem}
            estimatedItemSize={106}
          />
        </View>
      </View>
    );
  };

  const renderPopularItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <MovieCard data={item} onPress={onPressMovie} />;
  };

  const renderPopular = () => {
    return (
      popularMovies?.length > 0 && (
        <View style={{backgroundColor: ''}}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.medium,
              fontSize: 20,
              marginLeft: 8,
            }}>
            Popular on Netflix
          </Text>
          <View style={{marginTop: AppDimention.secondPadding}}>
            <FlashList
              data={popularMovies}
              keyExtractor={item => item.name}
              contentContainerStyle={{
                paddingHorizontal: 8,
              }}
              ItemSeparatorComponent={SpaceLine}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderPopularItem}
              estimatedItemSize={106}
            />
          </View>
        </View>
      )
    );
  };

  const renderTrendingItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <MovieCard data={item} onPress={onPressMovie} />;
  };

  const renderTrending = () => {
    return (
      trendingMovies?.length > 0 && (
        <View style={{backgroundColor: ''}}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.medium,
              fontSize: 20,
              marginLeft: 8,
            }}>
            Trending Now
          </Text>
          <View
            style={{
              marginTop: AppDimention.secondPadding,
            }}>
            <FlashList
              data={trendingMovies}
              keyExtractor={item => item.name}
              contentContainerStyle={{
                paddingHorizontal: 8,
              }}
              ItemSeparatorComponent={SpaceLine}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderTrendingItem}
              estimatedItemSize={106}
            />
          </View>
        </View>
      )
    );
  };

  const animPoster = useSharedValue(0);

  const animPosterStyle = useAnimatedStyle(() => {
    return animPoster.value >= 0
      ? {
          transform: [{translateY: (-animPoster.value * 2) / 3}],
        }
      : {};
  });

  const scrollHandler = useAnimatedScrollHandler(event => {
    animPoster.value = event.contentOffset.y;
  });

  return (
    <AppContainer>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.container}>
        <View style={styles.linearHeaderPoster}>
          <LinearGradient
            colors={['#000000', '#00000000']}
            style={{
              height: '100%',
            }}
          />
        </View>
        <Animated.View style={animPosterStyle}>
          <Image source={mainFilmPoster} style={styles.imgMoviesPoster} />
          <View style={styles.linearFooterPoster}>
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{
                height: '100%',
              }}
            />
          </View>
        </Animated.View>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
        }}>
        {renderHeader()}
        <Animated.ScrollView
          style={{}}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}>
          {renderMainFilm()}
          {/* <View>{renderContiWatch()}</View>
          <View style={{marginTop: AppDimention.mainPadding}}>
            {renderPreview()}
          </View> */}
          <View style={{marginTop: AppDimention.mainPadding}}>
            {renderPopular()}
          </View>
          <View style={{marginVertical: AppDimention.mainPadding}}>
            {renderTrending()}
          </View>
        </Animated.ScrollView>
      </View>
    </AppContainer>
  );
};

export default HomeScreen;
