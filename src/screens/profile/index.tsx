import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../components/AppContainer';
import AppImages from '../../constants/AppImages';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcons} from '../../constants/AppIcons';
import {AppDimention} from '../../constants/constants';
import {FlashList} from '@shopify/flash-list';
import LazyImage from '../../components/LazyImage/LazyImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginModal from './components/LoginModal';

type Props = {};

const ProfileScreen = (props: Props) => {
  const {} = props;
  const insets = useSafeAreaInsets();
  const [listUser, setListUser] = useState([10]);
  const [isVisible, setVisible] = useState(false);

  const getUser = () => {};

  const getUserLogged = async () => {
    const data = await AsyncStorage.getItem('userId');
    if (data) {
      const dataPar = JSON.parse(data);
      console.log('[dataPar] : ', dataPar);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  const renderItem = ({item}: any) => {
    const type = typeof item === 'number';
    return (
      <View
        style={{
          height: undefined,
          aspectRatio: 0.8,
          width: '100%',
          borderWidth: 1,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: undefined,
            aspectRatio: 1,
            width: '90%',
            borderRadius: 4,
            overflow: 'hidden',
          }}
          onPress={() => {
            if (type) {
              // add
              setVisible(true);
            } else {
            }
          }}>
          {type ? (
            <Image
              source={AppImages.addProfile}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: undefined,
                aspectRatio: 1,
              }}
            />
          ) : (
            <LazyImage
              source={'https://i.postimg.cc/wBHjBrSv/profile2.png'}
              styles={{height: '100%', width: '100%'}}
            />
          )}
        </TouchableOpacity>
        <Text style={{color: 'white'}}>
          {type ? 'Add Profile' : item?.name}
        </Text>
      </View>
    );
  };

  return (
    <AppContainer>
      <LoginModal
        isVisible={isVisible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
          borderWidth: 1,
          borderColor: 'green',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: AppDimention.mainPadding,
          }}>
          <FastImage
            source={AppImages.logoNetflix}
            style={{
              width: '40%',
              height: undefined,
              aspectRatio: 1900 / 512,
            }}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: AppDimention.mainPadding,
            }}>
            <AppIcons.edit />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'white',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '60%',
              height: 440,
              //   borderWidth: 1,
              borderColor: 'white',
            }}>
            <FlashList
              data={listUser}
              numColumns={2}
              renderItem={renderItem}
              estimatedItemSize={100}
              //   ItemSeparatorComponent={() => <View style={{height: 10}} />}
            />
          </View>
        </View>
      </View>
    </AppContainer>
  );
};

export default ProfileScreen;
