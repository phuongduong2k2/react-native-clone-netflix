import {View, Text} from 'react-native';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppDimention, AppFonts} from '../../constants/constants';
import AppButton from '../../components/AppButton';

const DownloadsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <AppContainer>
      <View style={{flex: 1, width: '100%', marginTop: insets.top}}>
        <View
          style={{
            height: 56,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.light,
              fontSize: 20,
              marginLeft: 8,
            }}>
            Smart Downloads
          </Text>
        </View>
        <View style={{marginTop: AppDimention.mainPadding, paddingLeft: 8}}>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.medium,
              fontSize: 20,
            }}>
            Introducing Downloads For You
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: AppFonts.light,
              fontSize: 14,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quam
            dui, vivamus bibendum ut. A morbi mi tortor ut felis non accumsan
            accumsan quis. Massa, id ut ipsum aliquam enim non posuere pulvinar
            diam.
          </Text>
        </View>
        <View
          style={{
            width: '50%',
            height: undefined,
            aspectRatio: 1,
            backgroundColor: '#424242',
            borderRadius: 100,
            alignSelf: 'center',
            marginVertical: AppDimention.mainPadding,
          }}
        />
        <View style={{paddingHorizontal: 8}}>
          <AppButton
            text={'SETUP'}
            textStyle={{
              color: 'white',
              fontFamily: AppFonts.light,
              textAlign: 'center',
            }}
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#0071EB',
              borderRadius: 4,
            }}
          />
        </View>
        <AppButton
          text={'Find Something To Download'}
          textStyle={{
            color: 'white',
            fontFamily: AppFonts.medium,
            textAlign: 'center',
          }}
          style={{
            marginTop: AppDimention.mainPadding,
            paddingHorizontal: AppDimention.secondPadding,
            alignSelf: 'center',
            height: 48,
            backgroundColor: '#424242',
            borderRadius: 4,
          }}
        />
      </View>
    </AppContainer>
  );
};

export default DownloadsScreen;
