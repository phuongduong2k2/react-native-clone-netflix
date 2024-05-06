import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppImages from '../../constants/AppImages';
import AppHeader from '../../components/AppHeader';
import AppSvg from '../../components/AppSvg';
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import TagAge from '../../components/TagAge';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {continueWatching} from '../../api/testData';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const renderHeader = () => {
    return (
      <View
        style={{
          height: 56,
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            aspectRatio: 1,
            height: '100%',
            width: undefined,
            paddingVertical: 8,
          }}>
          <AppSvg SvgSrc={AppIcons.nnetflix} />
        </View>
        <View
          style={{
            height: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
              TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
              Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
              My List
            </Text>
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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{alignItems: 'center', width: 56}}>
              <AppSvg SvgSrc={AppIcons.check} size={30} stroke="white" />
              <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
                My List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                marginHorizontal: AppDimention.secondPadding,
                borderRadius: 5,
                paddingHorizontal: AppDimention.secondPadding,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppSvg SvgSrc={AppIcons.play} size={30} />
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
            <TouchableOpacity style={{alignItems: 'center', width: 56}}>
              <AppSvg SvgSrc={AppIcons.info} size={30} stroke="white" />
              <Text style={{color: 'white', fontFamily: AppFonts.regular}}>
                Info
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderPreviewItem: ListRenderItem<any> = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'white',
          width: 106,
          height: 188,
          borderRadius: 8,
        }}></View>
    );
  };

  const renderPreview = () => {
    return (
      <View style={{backgroundColor: ''}}>
        <Text
          style={{color: 'white', fontFamily: AppFonts.medium, fontSize: 20}}>
          Continue Watching for Ellie
        </Text>
        <FlashList
          data={continueWatching}
          contentContainerStyle={{paddingHorizontal: 8}}
          ItemSeparatorComponent={() => <View style={{width: 8}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderPreviewItem}
          estimatedItemSize={106}
        />
      </View>
    );
  };

  return (
    <AppContainer>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={{width: '100%', position: 'absolute', zIndex: 0}}>
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
        <Image
          source={AppImages.mainFilmThumbnail}
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
      </View>

      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'white',
          marginTop: StatusBar.currentHeight ?? 0 + insets.top,
        }}>
        {renderHeader()}
        <ScrollView style={{}}>
          {renderMainFilm()}
          {renderPreview()}
          <View
            style={{
              height: 500,
              width: '100%',
              borderWidth: 1,
              borderColor: 'white',
            }}
          />
        </ScrollView>
      </View>
    </AppContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
