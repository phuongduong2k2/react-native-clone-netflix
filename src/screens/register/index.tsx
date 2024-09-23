import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppContainer from '../../components/AppContainer';
import AppHeader from '../../components/AppHeader';
import AppSvg from '../../components/AppSvg';
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';
import CustomTextInput from '../../components/AppTextInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AppButton from '../../components/AppButton';
import AppColors from '../../constants/AppColors';
import useAppNavigation from '../../navigation/useAppNavigation';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleChangeEmail = (e: string) => {
    setEmail(e);
  };

  const handleChangePassword = (e: string) => {
    setPassword(e);
  };

  return (
    <AppContainer>
      <View
        style={{
          flex: 1,
        }}>
        <AppHeader title="">
          <View
            style={{
              width: 100,
              paddingHorizontal: AppDimention.secondPadding,
            }}>
            {/* <AppSvg SvgSrc={AppIconsSVG.netflix} /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                padding: AppDimention.secondPadding,
              }}>
              <Text style={{color: 'black', fontFamily: AppFonts.regular}}>
                HELP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                padding: AppDimention.secondPadding,
              }}>
              <Text style={{color: 'black', fontFamily: AppFonts.regular}}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </AppHeader>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            padding: AppDimention.mainPadding,
          }}>
          <ScrollView>
            <Text
              style={{
                fontFamily: AppFonts.medium,
                fontSize: 24,
                color: 'black',
              }}>
              Ready to experience unlimited TV shows & movies?
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: 20,
                color: 'black',
                marginVertical: AppDimention.secondPadding,
              }}>
              Create an account and we'll send you an email with everything you
              need to know about Netflix.
            </Text>
            <CustomTextInput
              placeholder="Email"
              onChangeText={handleChangeEmail}
              textStyle={{fontSize: 16}}
            />
            <CustomTextInput
              containerStyle={{marginTop: AppDimention.secondPadding}}
              placeholder="Password"
              onChangeText={handleChangePassword}
              textStyle={{fontSize: 16}}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <BouncyCheckbox
                size={25}
                style={{
                  padding: AppDimention.secondPadding,
                }}
                fillColor="black"
                unFillColor="#FFFFFF"
                disableText
                // text="Please do not email me Netflix special offers."
                iconStyle={{
                  borderColor: 'black',
                  borderRadius: 1,
                }}
                innerIconStyle={{
                  borderWidth: 2,
                  borderRadius: 1,
                  borderColor: 'black',
                }}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                onPress={(isChecked: boolean) => {
                  setChecked(isChecked);
                }}
              />
              <Text
                style={{
                  fontFamily: AppFonts.regular,
                  color: 'black',
                }}>
                Please do not email me Netflix special offers.
              </Text>
            </View>
            <AppButton
              text={'CONTINUE'}
              textStyle={{
                fontFamily: AppFonts.regular,
                fontSize: 20,
                color: 'white',
              }}
              style={{
                backgroundColor: AppColors.main,
                borderRadius: 4,
                paddingVertical: AppDimention.secondPadding,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.replace('HomeNavigatorScreen');
              }}
            />
          </ScrollView>
        </View>
      </View>
    </AppContainer>
  );
};

export default RegisterScreen;
