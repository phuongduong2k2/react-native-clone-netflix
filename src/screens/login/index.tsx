import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AppContainer from '../../components/AppContainer';
import AppHeader from '../../components/AppHeader';
import AppSvg from '../../components/AppSvg';
import {AppIconsSVG} from '../../constants/AppIcons';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {AppDimention, AppFonts} from '../../constants/constants';
import useAppNavigation from '../../navigation/useAppNavigation';
import AppColors from '../../constants/AppColors';

const LoginScreen = () => {
  const navigation = useAppNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppContainer>
      <AppHeader title="" containerStyle={{backgroundColor: 'black'}}>
        <View
          style={{
            height: '100%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: AppDimention.secondPadding,
              justifyContent: 'center',
            }}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            {/* <AppSvg SvgSrc={AppIconsSVG.arrow_left} stroke="white" size={28} /> */}
          </TouchableOpacity>
          {/* <AppSvg
            SvgSrc={AppIconsSVG.netflix}
            isSquare={false}
            height={'100%'}
            width={100}
          /> */}
        </View>
        <></>
      </AppHeader>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'black',
          paddingHorizontal: AppDimention.secondPadding,
        }}>
        <AppTextInput
          placeholder="Email or phone number"
          onChangeText={e => {
            setEmail(e);
          }}
          placeholderStyle={{color: AppColors.mainText}}
          containerStyle={{
            marginTop: AppDimention.secondPadding,
            backgroundColor: '#403D3D',
            borderRadius: 4,
          }}
          blurColor={'#403D3D'}
          focusColor={'#666363'}
          focusPlaceholder="white"
          blurPlaceholder={AppColors.mainText}
          textStyle={{color: 'white'}}
          borderStyle={{borderWidth: 0}}
        />
        <AppTextInput
          placeholder="Password"
          onChangeText={e => {
            setPassword(e);
          }}
          textStyle={{color: 'white'}}
          focusPlaceholder="white"
          blurPlaceholder={AppColors.mainText}
          placeholderStyle={{color: AppColors.mainText}}
          containerStyle={{
            marginTop: AppDimention.secondPadding,
            backgroundColor: '#403D3D',
            borderRadius: 4,
          }}
          blurColor={'#403D3D'}
          focusColor={'#666363'}
          borderStyle={{borderWidth: 0}}
        />
        <AppButton
          onPress={() => {
            navigation.replace('HomeScreen');
          }}
          text={'Sign In'}
          textStyle={{
            fontFamily: AppFonts.regular,
            fontSize: 20,
            color: 'white',
          }}
          style={{
            paddingVertical: AppDimention.secondPadding,
            width: '100%',
            borderRadius: 4,
            backgroundColor: AppColors.main,
            alignItems: 'center',
            marginVertical: AppDimention.secondPadding,
          }}
        />
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Text
            style={{color: AppColors.mainText, fontFamily: AppFonts.regular}}>
            Need help?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginVertical: AppDimention.mainPadding,
          }}>
          <Text
            style={{color: AppColors.mainText, fontFamily: AppFonts.regular}}>
            New to Netflix?
          </Text>
          <TouchableOpacity
            style={{marginLeft: 4}}
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            <Text
              style={{color: AppColors.mainText, fontFamily: AppFonts.medium}}>
              Sign up now.
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: AppColors.mainText,
            fontFamily: AppFonts.regular,
            textAlign: 'center',
          }}>
          Sign in is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </Text>
      </View>
    </AppContainer>
  );
};

export default LoginScreen;
