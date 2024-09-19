import {View, Text} from 'react-native';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

const Space = (props: Props) => {
  const {width = 0, height = 0} = props;
  return <View style={{height, width}} />;
};

export default Space;
