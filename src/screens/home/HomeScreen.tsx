import {
  Button,
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AppContainer from '../../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppImages from '../../constants/AppImages';
import AppSvg from '../../components/AppSvg';

import {AppDimention, AppFonts, LoadingState} from '../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import TagAge from '../../components/TagAge';
import {FlashList} from '@shopify/flash-list';
import ContiWatchItem from '../components/ContiWatchItem';
import PreviewItem from '../components/PreviewItem';
import MovieCard from '../components/MovieCard';
import {MovieItemProps} from '../../types';

import {AppActions} from '../../controllers/slice/AppSlice';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {openPhotoPicker, PERMISSIONS, request} from 'react-native-permissions';
import axios from 'axios';
import AppIcons from '../../constants/AppIcons';
import {
  useAppDispatch,
  useAppSelector,
  useMovies,
} from '../../controllers/hooks';
import {MovieActions} from '../../controllers/slice/MovieSlice';
import _ from 'lodash';
import Indicator from '../../components/Indicator';
var RNFS = require('react-native-fs');

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
  const allMovie = useMovies();

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
    // getPopularMovies();
    // getTrendingMovies();
    // getAllMovies();
    dispatch(MovieActions.getAllMovies());
  }, [userInfo, token]);

  // const testUpload = async (data: any) => {
  //   try {
  //     const res = await axios.post('http://192.168.1.4:8000/api/upload', data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log('upload failed');
  //   }
  // };

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
                console.log(popularMovies);
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
              }}
              onPress={() => {
                // let options = {
                //   title: 'Select Image',
                //   customButtons: [
                //     {
                //       name: 'customOptionKey',
                //       title: 'Choose Photo from Custom Option',
                //     },
                //   ],
                //   storageOptions: {
                //     skipBackup: true,
                //     path: 'images',
                //   },
                // };
                // launchImageLibrary({mediaType: 'photo'}, async response => {
                //   if (response.didCancel) {
                //     console.log('User cancelled image picker');
                //   } else if (response.errorMessage) {
                //     console.log('ImagePicker Error: ', response.errorMessage);
                //   } else if (response.assets && response.assets.length > 0) {
                //     const data = new FormData();
                //     data.append('image', {
                //       name: response.assets[0].fileName,
                //       type: response.assets[0].type,
                //       uri: response.assets[0].uri,
                //     });
                //     console.log(data);
                //     await testUpload(data);
                //   }
                // });
              }}>
              <ImageIcon source={AppIcons.play} />
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
              onPress={() => {}}>
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
          <FlatList
            data={[]}
            keyExtractor={item => item.name}
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
            ItemSeparatorComponent={SpaceLine}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderContiWatchItem}
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
          <FlatList
            data={[]}
            keyExtractor={item => item.name}
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
            ItemSeparatorComponent={SeparatorWidth}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderPreviewItem}
          />
        </View>
      </View>
    );
  };

  const renderPopularItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <MovieCard data={item} onPress={onPressMovie} />;
  };

  const renderTrendingItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return <MovieCard data={item} onPress={onPressMovie} />;
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

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {allMovie.status === LoadingState.loading ? (
          <>
            <Indicator />
            <Text style={{color: 'white'}}>Loading...</Text>
          </>
        ) : (
          <Text style={{color: 'white'}}>
            {allMovie.status === LoadingState.failed
              ? 'Get data failed'
              : "Don't have data"}
          </Text>
        )}
      </View>
    );
  };

  const flatListRef = useRef<FlatList>(null);

  const refresh = useCallback(() => {
    dispatch(MovieActions.getAllMovies());
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [dispatch]);

  return (
    <AppContainer>
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
        {/* header */}
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
                    userInfo && userInfo?.avatar.length
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
        {/* header */}

        <Animated.ScrollView
          style={{}}
          onScroll={scrollHandler}
          refreshControl={
            <RefreshControl
              refreshing={allMovie.status === LoadingState.loading}
              onRefresh={refresh}
            />
          }
          showsVerticalScrollIndicator={false}>
          {renderMainFilm()}
          {/* <View>{renderContiWatch()}</View>
          <View style={{marginTop: AppDimention.mainPadding}}>
            {renderPreview()}
          </View> */}

          {/* popular movies */}
          <View style={{marginTop: AppDimention.mainPadding}}>
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
              <View
                style={{
                  marginTop: AppDimention.secondPadding,
                  height: (106 * 466) / 324,
                }}>
                <FlatList
                  data={allMovie.movies}
                  keyExtractor={item => item.name}
                  ref={flatListRef}
                  contentContainerStyle={{
                    paddingHorizontal: 8,
                    width: _.isEmpty(allMovie.movies) ? '100%' : undefined,
                  }}
                  ListEmptyComponent={renderEmptyComponent}
                  ItemSeparatorComponent={SpaceLine}
                  horizontal
                  renderItem={renderPopularItem}
                  initialNumToRender={6}
                  maxToRenderPerBatch={6}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
          {/* popular movies */}

          <View style={{marginVertical: AppDimention.mainPadding}}>
            {trendingMovies?.length > 0 && (
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
                  <FlatList
                    data={trendingMovies}
                    keyExtractor={item => item.name}
                    contentContainerStyle={{paddingHorizontal: 8}}
                    ListEmptyComponent={renderEmptyComponent}
                    ItemSeparatorComponent={SpaceLine}
                    horizontal
                    renderItem={renderTrendingItem}
                    initialNumToRender={6}
                    maxToRenderPerBatch={6}
                  />
                </View>
              </View>
            )}
          </View>
        </Animated.ScrollView>
      </View>
    </AppContainer>
  );
};

export default HomeScreen;
