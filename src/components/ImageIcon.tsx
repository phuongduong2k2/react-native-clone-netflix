import {View, Text, StyleProp, ImageStyle} from 'react-native';
import React from 'react';
import FastImage, {ResizeMode, Source} from 'react-native-fast-image';

type Props = {
  source?: number | Source | undefined;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
};

const ImageIcon = (props: Props) => {
  const {source, style = {}, resizeMode = 'contain'} = props;
  return (
    <FastImage
      source={source}
      style={{height: 30, width: 30, ...(style as object)}}
      resizeMode={resizeMode}
    />
  );
};

export default ImageIcon;
