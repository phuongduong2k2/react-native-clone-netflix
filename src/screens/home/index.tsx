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
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import TagAge from '../../components/TagAge';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import ContiWatchItem from '../components/ContiWatchItem';
import {dataContiWatch, dataPreviews, dataTrending} from '../../api/testData';
import PreviewItem from '../components/PreviewItem';
import MovieCard from '../components/MovieCard';
import {MovieItemProps} from '../../types';
import {useAppDispatch} from '../../hooks';
import {AppActions} from '../../redux/slice/AppSlice';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useAppNavigation from '../../navigation/useAppNavigation';
import {API} from '../../api';

const SpaceLine = () => <View style={{width: 8}} />;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [popularMovies, setPopularMovies] = useState<MovieItemProps[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<MovieItemProps[]>([]);

  const mainFilmPoster = AppImages.posters.dune;

  const onPressMovie = (data: MovieItemProps) => {
    console.log(data);
    navigation.navigate('WatchingScreen', data);
  };

  const getPopularMovies = async () => {
    const res = await API.getPopularMovies();
    setPopularMovies(res.data);
  };

  const getTrendingMovies = async () => {
    const res = await API.getTrendingMovies();
    setTrendingMovies(res.data);
  };

  useEffect(() => {
    getPopularMovies();
    getTrendingMovies();
  }, []);

  const renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            height: 56,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginVertical: AppDimention.secondPadding,
              marginLeft: AppDimention.secondPadding,
            }}>
            <Image
              source={AppImages.nNetflix}
              style={{
                resizeMode: 'contain',
                aspectRatio: 18 / 32,
                height: '100%',
                width: undefined,
              }}
            />
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
              }}>
              <AppIcons.cast fill="white" height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: AppDimention.secondPadding / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={AppImages.profiles.blue} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 4,
              marginHorizontal: AppDimention.secondPadding,
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white', fontFamily: AppFonts.light}}>
              TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 4,
              marginHorizontal: AppDimention.secondPadding,
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white', fontFamily: AppFonts.light}}>
              Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 4,
              marginHorizontal: AppDimention.secondPadding,
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white', fontFamily: AppFonts.light}}>
              Categories
            </Text>
            <View style={{height: '80%', aspectRatio: 1, width: undefined}}>
              <AppIcons.dropDown height={'100%'} width={'100%'} fill="white" />
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
          // backgroundColor: 'white',
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
              <AppIcons.add height={30} width={30} fill="white" />
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
              <AppSvg SvgSrc={AppIcons.play} size={30} fill="black" />
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
              <AppIcons.info height={30} width={30} fill="white" />
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
            ItemSeparatorComponent={() => <View style={{width: 16}} />}
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
    );
  };

  const renderTrendingItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <MovieCard data={item} onPress={onPressMovie} />;
  };

  const renderTrending = () => {
    return (
      trendingMovies.length > 0 && (
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
        <View
          style={{
            height: '25%',
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          }}>
          <LinearGradient
            colors={['#000000', '#00000000']}
            style={{
              height: '100%',
            }}
          />
        </View>
        <Animated.View style={animPosterStyle}>
          <Image
            source={mainFilmPoster}
            style={{
              resizeMode: 'contain',
              width: '100%',
              aspectRatio: 760 / 1080,
              height: undefined,
              zIndex: 0,
            }}
          />
          <View
            style={{
              height: '25%',
              bottom: 0,
              position: 'absolute',
              width: '100%',
              zIndex: 1,
            }}>
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
          marginTop: StatusBar.currentHeight ?? 0 + insets.top,
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

const styles = StyleSheet.create({
  container: {width: '100%', position: 'absolute', zIndex: 0},
});
