import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppContainer from '../../components/AppContainer';
import AppHeader from '../../components/AppHeader';
import AppSvg from '../../components/AppSvg';
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention, AppFonts} from '../../constants/constants';
import CustomTextInput from '../../components/CustomTextInput';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();

  const [test, setTest] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <AppSvg SvgSrc={AppIcons.netflix} />
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
              <Text style={{color: 'black', fontFamily: AppFonts.light}}>
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
        <Button
          title="test"
          onPress={() => {
            setTest(!test);
          }}
        />
        <Text style={{color: test ? 'red' : 'green'}}>TEST</Text>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <ScrollView>
            <Text>Ready to experience unlimited TV shows & movies?</Text>
            <Text>
              Create an account and we'll sned you an email with everything you
              need to know about Netflix.
            </Text>
            <CustomTextInput
              placeholder="Email"
              onChangeText={handleChangeEmail}
              textStyle={{fontSize: 16}}
            />
            <CustomTextInput
              placeholder="Password"
              onChangeText={handleChangePassword}
              textStyle={{fontSize: 16}}
            />
          </ScrollView>
        </View>
      </View>
    </AppContainer>
  );
};

export default RegisterScreen;
