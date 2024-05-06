import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MovieItemProps} from '../../../types';

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
        backgroundColor: '#191919',
        borderRadius: 8,
        overflow: 'hidden',
      }}
      onPress={() => {
        onPress(data);
      }}>
      <Image source={data.thumbnail} style={{resizeMode: 'contain'}} />
    </TouchableOpacity>
  );
};

export default MovieCard;
