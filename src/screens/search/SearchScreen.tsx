import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppContainer from '../../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppDimention, AppFonts} from '../../constants/constants';
import AppImages from '../../constants/AppImages';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {MovieItemProps} from '../../types';
import ImageIcon from '../../components/ImageIcon';
import AppIcons from '../../constants/AppIcons';

// const listFilmDefault = [
//   {
//     id: 0,
//     name: 'The Sea Beat',
//     thumbnail: AppImages.landscape_thumbnails.theSeaBeast,
//   },
//   {
//     id: 1,
//     name: 'Peaky Blinders',
//     thumbnail: AppImages.landscape_thumbnails.peakyBlinders,
//   },
//   {
//     id: 2,
//     name: 'The Umbrella Academy',
//     thumbnail: AppImages.landscape_thumbnails.theUmbrellaAcademy,
//   },
//   {
//     id: 3,
//     name: 'KeepSweet, Pray, AndObey',
//     thumbnail: AppImages.landscape_thumbnails.keepSweetPrayAndObey,
//   },
//   {
//     id: 4,
//     name: 'Attack On Pearl Harbour',
//     thumbnail: AppImages.landscape_thumbnails.attackOnPearlHarbour,
//   },
//   {
//     id: 5,
//     name: 'The King Of Staten Island',
//     thumbnail: AppImages.landscape_thumbnails.theKingOfStatenIsland,
//   },
//   {
//     id: 6,
//     name: 'Blonde',
//     thumbnail: AppImages.landscape_thumbnails.blonde,
//   },
//   {
//     id: 7,
//     name: 'Dangerous Liasons',
//     thumbnail: AppImages.landscape_thumbnails.dangerousLiasons,
//   },
//   {
//     id: 8,
//     name: 'Halftime',
//     thumbnail: AppImages.landscape_thumbnails.halftime,
//   },
//   {
//     id: 9,
//     name: 'Heat',
//     thumbnail: AppImages.landscape_thumbnails.heat,
//   },
//   {
//     id: 10,
//     name: 'Hustle',
//     thumbnail: AppImages.landscape_thumbnails.hustle,
//   },
//   {
//     id: 11,
//     name: 'The Art Of Incarceration',
//     thumbnail: AppImages.landscape_thumbnails.theArtOfIncarceration,
//   },
//   {
//     id: 12,
//     name: 'The Girl In The Picture',
//     thumbnail: AppImages.landscape_thumbnails.theGirlInThePicture,
//   },
//   {
//     id: 13,
//     name: 'The Gray Man',
//     thumbnail: AppImages.landscape_thumbnails.theGrayMan,
//   },
// ];

const SearchScreen = () => {
  const insets = useSafeAreaInsets();

  const searchRef = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  // const [listFilmFilter, setListFilmFilter] = useState(listFilmDefault);

  const onChangeTextSearch = (text: string) => {
    setSearch(text);
  };

  const onFilterFilm = () => {
    if (search) {
      // const newList = listFilmDefault.filter(item =>
      //   item.name.toLowerCase().includes(search.toLowerCase()),
      // );
      // setListFilmFilter(newList);
    } else {
      // setListFilmFilter(listFilmDefault);
    }
  };

  const onClearSearching = () => {
    if (searchRef.current) {
      searchRef.current.blur();
      searchRef.current.clear();
    }
    setSearch('');
  };

  useEffect(() => {
    onFilterFilm();
  }, [search]);

  const renderSearch = () => {
    return (
      <View
        style={{
          height: 56,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <View
          style={{
            height: 32,
            flexDirection: 'row',
            paddingVertical: 2,
            alignItems: 'center',
            backgroundColor: '#292929',
            borderRadius: 4,
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (searchRef.current) {
                searchRef.current.focus();
              }
            }}
            activeOpacity={1}
            style={{
              flex: 1,
              height: '100%',
              flexDirection: 'row',
            }}>
            <View style={{height: '100%', paddingVertical: 4}}>
              <ImageIcon source={AppIcons.search} />
            </View>
            <TextInput
              placeholder="Search for a show, movie, genre, e.t.c."
              placeholderTextColor={'#737373'}
              onChangeText={onChangeTextSearch}
              ref={searchRef}
              style={{
                height: '100%',
                flex: 1,
                padding: 0,
                fontFamily: AppFonts.regular,
                color: 'white',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
          {search && (
            <TouchableOpacity
              style={{
                aspectRatio: 1,
                height: '100%',
                paddingVertical: 4,
                alignItems: 'center',
                justifyContent: 'center',
                width: undefined,
                marginHorizontal: AppDimention.secondPadding / 2,
              }}
              onPress={onClearSearching}>
              <ImageIcon source={AppIcons.x_circle} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderFilmItem: ListRenderItem<MovieItemProps> = ({item}) => {
    return (
      <View
        style={{
          height: 68,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          {/* <Image
            source={item.thumbnail}
            style={{
              resizeMode: 'contain',
              height: '100%',
              aspectRatio: 96 / 54,
              width: undefined,
              borderRadius: 8,
            }}
          /> */}
          <Text
            style={{
              flex: 1,
              color: '#8C8C8C',
              fontFamily: AppFonts.bold,
              marginLeft: AppDimention.secondPadding,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 100,
            borderWidth: 4,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: AppDimention.secondPadding,
          }}>
          <ImageIcon source={AppIcons.screen_cast} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppContainer>
      <View style={{flex: 1, marginTop: insets.top}}>
        {renderSearch()}
        <View
          style={{
            flex: 1,
            marginTop: AppDimention.secondPadding,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.medium,
              fontSize: 20,
              marginLeft: 8,
            }}>
            Movies & TV
          </Text>
          {/* <FlashList
            data={listFilmFilter}
            contentContainerStyle={{
              paddingHorizontal: 8,
              paddingTop: AppDimention.mainPadding,
            }}
            renderItem={renderFilmItem}
            ItemSeparatorComponent={() => (
              <View style={{height: AppDimention.secondPadding}} />
            )}
            ListFooterComponent={() => <View style={{height: 24}} />}
            estimatedItemSize={68}
          /> */}
        </View>
      </View>
    </AppContainer>
  );
};

export default SearchScreen;
