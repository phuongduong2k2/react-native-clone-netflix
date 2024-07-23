import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MovieItemProps} from '../../../types';
import {AppFonts} from '../../../constants/constants';

type Props = {
  data: MovieItemProps;
  onPress?: () => void;
};

const PreviewItem = (props: Props) => {
  const {data, onPress} = props;

  const onPressing = () => (onPress ? onPress : null);

  return (
    <TouchableOpacity
      style={{width: 102, height: 102 + 11}}
      onPress={onPressing}>
      <View
        style={{
          height: 102,
          borderWidth: 1,
          borderColor: 'white',
          width: 102,
          borderRadius: 1000,
          overflow: 'hidden',
        }}>
        <Image source={data.thumbnail} style={{resizeMode: 'contain'}} />
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          justifyContent: 'flex-end',
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily: AppFonts.bold,
            fontSize: 22,
          }}>
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PreviewItem;
