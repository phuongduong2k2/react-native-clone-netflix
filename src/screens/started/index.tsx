import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppSvg from '../../components/AppSvg';
import {AppIcons} from '../../constants/AppIcons';
import AppContainer from '../../components/AppContainer';
import {AppDimention, AppFonts} from '../../constants/constants';
import AppImages from '../../constants/AppImages';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import useAppNavigation from '../../navigation/useAppNavigation';
import ReactNativeModal from 'react-native-modal';
import CustomTextInput from '../../components/CustomTextInput';

const StartedScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const [isVisible, setVisible] = useState(false);

  return (
    <MenuProvider>
      <AppContainer>
        <View
          style={{
            flex: 1,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <AppSvg SvgSrc={AppIcons.nnetflix} size={50} />
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{...styles.btn}}>
                <Text style={{...styles.text, fontFamily: AppFonts.bold}}>
                  PRIVACY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.btn}}>
                <Text style={{...styles.text, fontFamily: AppFonts.bold}}>
                  SIGN IN
                </Text>
              </TouchableOpacity>
              <Menu>
                <MenuTrigger style={{padding: 8, opacity: 0.5}}>
                  <AppSvg SvgSrc={AppIcons.threeDots} size={20} color="white" />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{padding: 8}}>
                  <MenuOption onSelect={() => {}}>
                    <Text style={{color: 'black', fontSize: 16}}>FAQs</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => {}}>
                    <Text style={{color: 'black', fontSize: 16}}>Help</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View
            style={{
              height: 500,
              position: 'absolute',
              zIndex: -100,
              width: '100%',
            }}>
            <View
              style={{
                height: 275,
                position: 'absolute',
                width: '100%',
                zIndex: 100,
              }}>
              <LinearGradient
                colors={['#000000', '#00000000']}
                style={{
                  flex: 1,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              />
            </View>
            <Image
              source={AppImages.backgroundRegister}
              style={{
                resizeMode: 'cover',
                width: '100%',
                zIndex: -100,
                height: '100%',
              }}
            />
            <View
              style={{
                height: 275,
                position: 'absolute',
                width: '100%',
                zIndex: 100,
                bottom: 0,
              }}>
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{
                  flex: 1,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: AppDimention.secondPadding + insets.bottom,
              width: '100%',
              paddingHorizontal: AppDimention.secondPadding,
            }}>
            <View style={{marginBottom: '40%'}}>
              <Text
                style={{
                  ...styles.text,
                  textAlign: 'center',
                  width: 200,
                  fontSize: 30,
                  marginBottom: AppDimention.secondPadding,
                  fontFamily: AppFonts.bold,
                }}>
                Unlimited movies, TV shows & more
              </Text>
              <Text
                style={{
                  ...styles.text,
                  fontSize: 18,
                  fontWeight: '400',
                  textAlign: 'center',
                  fontFamily: AppFonts.regular,
                }}>
                Watch anywhere. Cancel anytime.
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingVertical: AppDimention.secondPadding,
                  width: '100%',
                  borderRadius: 4,
                  backgroundColor: '#e50913',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setVisible(true);
                }}>
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    fontSize: 20,
                    color: 'white',
                  }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ReactNativeModal
            isVisible={isVisible}
            hasBackdrop
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            onBackdropPress={() => {
              setVisible(false);
            }}
            style={{margin: 0, padding: 0}}>
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'white',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <TouchableOpacity
                style={{
                  aspectRatio: 1,
                  height: 30,
                  width: undefined,
                  alignSelf: 'flex-end',
                  margin: AppDimention.mainPadding,
                }}
                onPress={() => {
                  setVisible(false);
                }}>
                <AppSvg SvgSrc={AppIcons.close} size={30} color="grey" />
              </TouchableOpacity>
              <ScrollView
                style={{
                  flex: 1,
                  paddingHorizontal: AppDimention.mainPadding,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: AppFonts.medium,
                    color: 'black',
                    fontSize: 30,
                  }}>
                  Ready to watch?
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: AppFonts.regular,
                    color: 'grey',
                    fontSize: 18,
                    marginVertical: AppDimention.mainPadding,
                  }}>
                  Enter your email to create or sign in to your account.
                </Text>
                <CustomTextInput />
                <TouchableOpacity
                  style={{
                    paddingVertical: AppDimention.secondPadding,
                    width: '100%',
                    borderRadius: 4,
                    backgroundColor: '#e50913',
                    alignItems: 'center',
                    marginTop: AppDimention.secondPadding,
                  }}
                  onPress={() => {
                    setVisible(true);
                  }}>
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      fontSize: 20,
                      color: 'white',
                    }}>
                    GET STARTED
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ReactNativeModal>
        </View>
      </AppContainer>
    </MenuProvider>
  );
};

export default StartedScreen;

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    alignContent: 'center',
    color: 'white',
    fontWeight: '500',
  },
  btn: {padding: 8},
});
