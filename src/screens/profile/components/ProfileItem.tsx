import {View, Text, TouchableOpacity, Image, ViewStyle} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import LazyImage from '../../../components/LazyImage';
import AppImages from '../../../constants/AppImages';
import {API} from '../../../api/api';
import {AppIcons} from '../../../constants/AppIcons';
import ImageIcon from '../../../components/ImageIcon';

type Props = {
  type?: boolean;
  id?: number;
  onPress?: (data: any) => void;
  editMode?: boolean;
  style?: ViewStyle;
  useSkeleton?: boolean;
  children?: ReactNode;
};

type DataProps = {
  avatar: string;
  name: string;
  id: number;
  email: string;
};

const ProfileItem = (props: Props) => {
  const {
    type,
    onPress = () => {},
    id = null,
    editMode = false,
    style,
    useSkeleton = true,
    children = null,
  } = props;

  const [data, setData] = useState<DataProps>();

  const getUserById = async () => {
    console.log('getUserById');

    if (typeof id === 'number' && id > 0 && !data) {
      const res = await API.getUserById(id);
      if (res.status === 200) {
        setData(res.data.data);
      }
      console.log(res);
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
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
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
        {editMode && !type && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1000,
              height: '100%',
              width: '100%',
              backgroundColor: 'black',
              opacity: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageIcon source={AppIcons.x} style={{height: 50, width: 50}} />
          </View>
        )}
        {children ? (
          children
        ) : (
          <LazyImage
            useSkeleton={useSkeleton}
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
