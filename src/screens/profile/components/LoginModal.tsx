import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {AppDimention} from '../../../constants/constants';
import {API} from '../../../api/api';
import {useDispatch} from 'react-redux';
import {AppActions} from '../../../controllers/slice/AppSlice';
import useAppNavigation from '../../../navigation/useAppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  isVisible?: boolean;
  onClose?: () => void;
  selectedEmail?: string;
};

const listAvatar = [
  {
    url: 'https://i.postimg.cc/9QyfC2gK/profile1.png',
  },
  {
    url: 'https://i.postimg.cc/wBHjBrSv/profile2.png',
  },
  {
    url: 'https://i.postimg.cc/DZwfrXf3/profile3.png',
  },
  {
    url: 'https://i.postimg.cc/mrw21wsS/profile4.png',
  },
];

const LoginModal = (props: Props) => {
  const {isVisible = false, onClose = () => {}, selectedEmail = ''} = props;
  const [mode, setMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  const toggleMode = () => {
    setMode(!mode);
  };

  const getRandomAvatar = () => {
    const listRandom = [
      ...listAvatar,
      ...listAvatar,
      listAvatar[0],
      listAvatar[1],
    ];
    let random = 10;
    while (random === 10) {
      random = Math.round(Math.random() * 10);
    }
    return listRandom[random].url;
  };

  useEffect(() => {
    if (selectedEmail.length > 0) {
      setEmail(selectedEmail);
    }
  }, [selectedEmail]);

  const handleClose = () => {
    onClose();
    setEmail('');
    setPassword('');
    setRePassword('');
    setMode(false);
  };

  const saveUserId = async (id: number) => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      const newUserId = JSON.parse(userId);
      console.log(typeof newUserId, newUserId);
      if (!newUserId.includes(id)) {
        newUserId.push(id);
      }
      await AsyncStorage.setItem('userId', JSON.stringify(newUserId));
    } else {
      await AsyncStorage.setItem('userId', JSON.stringify([id]));
    }
  };

  const onSubmit = async () => {
    const data = {
      email,
      password,
    };
    if (!mode) {
      // login
      const res = await API.login(data);
      if (res?.status === 200) {
        dispatch(AppActions.setUserInfo(res.data.userInfo[0]));
        dispatch(AppActions.setToken(res.data.accessToken));
        saveUserId(res.data.userInfo[0].id);
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('HomeScreen');
        }
      } else {
        Alert.alert('Something wrong!', 'Please try again');
      }
    } else {
      // register
      data.avatar = getRandomAvatar();
      const res = await API.register(data);
      if (res?.status === 200) {
        Alert.alert('Register success', 'Please login now');
        setMode(false);
      } else {
        Alert.alert('Something wrong!', 'Please try again');
      }
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={{margin: 0}}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      onBackdropPress={onClose}
      onModalHide={handleClose}>
      <View
        style={{
          height: 400,
          width: '80%',
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View
            style={{
              flex: 1,
              width: '100%',
              borderWidth: 1,
              padding: AppDimention.secondPadding,
            }}>
            <Text style={{fontSize: 25, color: 'black', fontWeight: '600'}}>
              {mode ? 'Register' : 'Login'}
            </Text>
            <View style={{flex: 1, paddingTop: AppDimention.mainPadding}}>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={e => {
                  setEmail(e);
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: 'rgb(101, 101, 101)',
                }}
              />
              <TextInput
                placeholder="Password"
                value={password}
                autoCapitalize="none"
                onChangeText={e => {
                  setPassword(e);
                }}
                secureTextEntry={true}
                style={{
                  borderWidth: 1,
                  marginVertical: 20,
                  borderRadius: 8,
                  borderColor: 'rgb(101, 101, 101)',
                }}
              />
              {mode && (
                <TextInput
                  value={repassword}
                  autoCapitalize="none"
                  onChangeText={e => {
                    setRePassword(e);
                  }}
                  placeholder="RePassword"
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: 'rgb(101, 101, 101)',
                  }}
                />
              )}
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{color: 'black'}}>
                {mode ? 'Have account?' : "Don't have account yet!"}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-start'}}
                onPress={toggleMode}>
                <Text style={{color: mode ? 'blue' : 'red', fontWeight: '600'}}>
                  {mode ? 'Register' : 'Login'} now
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 50,
              }}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey',
                    paddingHorizontal: 30,
                    borderRadius: 8,
                    height: '100%',
                  }}
                  onPress={onClose}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'blue',
                    paddingHorizontal: 30,
                    borderRadius: 8,
                    height: '100%',
                  }}
                  onPress={onSubmit}>
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    {mode ? 'Register' : 'Login'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default LoginModal;
