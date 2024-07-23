import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {MovieItemProps} from '../../../types';
import AppImages from '../../../constants/AppImages';

type Props = {
  data: MovieItemProps;
  onPress?: (item: MovieItemProps) => void;
};

const MovieCard = (props: Props) => {
  const {data, onPress = () => {}} = props;
  return (
    <TouchableOpacity
      style={{
        width: 106,
        height: undefined,
        aspectRatio: 324 / 466,
        backgroundColor: '#191919',
        borderRadius: 8,
        overflow: 'hidden',
      }}
      onPress={() => {
        onPress(data);
      }}>
      <Image
        source={AppImages.nNetflix}
        style={{
          resizeMode: 'contain',
          position: 'absolute',
          zIndex: 1,
          height: undefined,
          width: 10,
          aspectRatio: 54 / 96,
          top: 5,
          left: 5,
        }}
      />
      <Image
        source={data.thumbnail}
        style={{resizeMode: 'cover', height: '100%'}}
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
