import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LazyImage from '../../../components/LazyImage/LazyImage';
import AppImages from '../../../constants/AppImages';
import {API} from '../../../api';

type Props = {
  type?: boolean;
  id?: number;
  onPress?: (data: any) => void;
};

type DataProps = {
  avatar: string;
  name: string;
  id: number;
  email: string;
};

const ProfileItem = (props: Props) => {
  const {type, onPress = () => {}, id = null} = props;

  const [data, setData] = useState<DataProps>();

  const getUserById = async () => {
    console.log('getUserById');

    if (typeof id === 'number' && id > 0 && !data) {
      const res = await API.getUserById(id);
      if (res.status === 200) {
        setData(res.data.data);
      }
    }
  };
  useEffect(() => {
    getUserById();
  }, []);

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
          onPress(data);
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
            source={data ? data.avatar : ''}
            styles={{height: '100%', width: '100%'}}
          />
        )}
      </TouchableOpacity>
      <Text style={{color: 'white'}}>{type ? 'Add Profile' : data?.name}</Text>
    </View>
  );
};

export default ProfileItem;
