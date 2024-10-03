import {TouchableOpacity} from 'react-native';
import React from 'react';
import {MovieItemProps} from '../../../types';
import LazyImage from '../../../components/LazyImage';
import {HOST} from '../../../api/api';

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
      <LazyImage
        source={`${HOST}/${data.portrait}`}
        styles={{height: '100%', width: undefined, aspectRatio: 0.7}}
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
