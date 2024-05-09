import {View, Text, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import React, {useRef} from 'react';
import AppContainer from '../../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppTextInput from '../../components/AppTextInput';
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();

  const searchRef = useRef<TextInput>(null);

  const renderSearch = () => {
    return (
      <View
        style={{
          height: 56,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
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
            marginLeft: 8,
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
              <AppIcons.search
                height={'100%'}
                width={undefined}
                style={{
                  aspectRatio: 1,
                  marginHorizontal: AppDimention.secondPadding / 2,
                }}
                fill="#737373"
              />
            </View>
            <TextInput
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
            onPress={() => {
              if (searchRef.current) {
                searchRef.current.blur();
                searchRef.current.clear();
              }
            }}>
            <AppIcons.closeCircle
              height={'100%'}
              width={undefined}
              style={{
                aspectRatio: 1,
              }}
              fill="#737373"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (searchRef.current) {
              searchRef.current.blur();
              searchRef.current.clear();
            }
          }}
          style={{
            marginHorizontal: AppDimention.secondPadding,
            paddingVertical: 2,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.light,
              fontSize: 16,
            }}>
            Cancel
          </Text>
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
            borderWidth: 1,
            borderColor: 'white',
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
        </View>
      </View>
    </AppContainer>
  );
};

export default SearchScreen;
