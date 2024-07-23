import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {MovieItemProps} from '../../../types';
import AppImages from '../../../constants/AppImages';
import ImgPortraitTag from '../../../components/ImgPortraitTag/ImgPortraitTag';

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
        alignItems: 'center',
      }}
      onPress={() => {
        onPress(data);
      }}>
      <ImgPortraitTag source={data.thumbnail} />
    </TouchableOpacity>
  );
};

export default MovieCard;
