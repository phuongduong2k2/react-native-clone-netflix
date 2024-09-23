import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../components/AppContainer';
import AppImages from '../../constants/AppImages';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcons, AppIconsSVG} from '../../constants/AppIcons';
import {AppDimention} from '../../constants/constants';
import {FlashList} from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginModal from './components/LoginModal';
import ProfileItem from './components/ProfileItem';
import {useNavigation} from '@react-navigation/native';
import useAppNavigation from '../../navigation/useAppNavigation';
import ImageIcon from '../../components/ImageIcon';

type Props = {};

const ProfileScreen = (props: Props) => {
  const {} = props;
  const insets = useSafeAreaInsets();
  const [listUser, setListUser] = useState([-1]);
  const [isVisible, setVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [editMode, setEditMode] = useState(false);

  const navigation = useAppNavigation();

  const getUserLogged = async () => {
    const data = await AsyncStorage.getItem('userId');
    if (data) {
      const dataPar = JSON.parse(data);
      console.log(dataPar);

      setListUser([...dataPar, ...listUser]);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const renderItem = ({item}: any) => {
    return (
      <ProfileItem
        type={item < 0}
        editMode={editMode}
        id={Number(item)}
        onPress={async data => {
          console.log(data);
          if (editMode) {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
              const newUserId = JSON.parse(userId).filter(
                (ite: any) => Number(ite) !== data.id,
              );
              AsyncStorage.setItem('userId', JSON.stringify(newUserId));
              setListUser([...newUserId, -1]);
            }
          } else {
            if (data?.id >= 0) {
              setSelectedEmail(data.email);
            }
            setVisible(true);
          }
        }}
      />
    );
  };

  return (
    <AppContainer>
      <LoginModal
        selectedEmail={selectedEmail}
        isVisible={isVisible}
        onClose={() => {
          setVisible(false);
          setSelectedEmail('');
        }}
      />
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: AppDimention.mainPadding,
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: AppDimention.mainPadding,
            }}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else navigation.navigate('HomeNavigatorScreen');
            }}>
            <ImageIcon source={AppIcons.arrow_left} />
          </TouchableOpacity>
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
            }}
            onPress={toggleEditMode}>
            <ImageIcon source={AppIcons.pen} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '60%',
              height: 440,
            }}>
            <FlashList
              data={listUser}
              numColumns={2}
              key={editMode.toString()}
              renderItem={renderItem}
              estimatedItemSize={100}
            />
          </View>
        </View>
      </View>
    </AppContainer>
  );
};

export default ProfileScreen;
