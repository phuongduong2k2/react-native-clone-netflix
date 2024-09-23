import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

type Props = {
  size?: number;
  color?: string;
  animating?: boolean;
};

const Indicator = (props: Props) => {
  const {size = 35, color = MD2Colors.red800, animating = true} = props;
  return <ActivityIndicator animating={animating} size={size} color={color} />;
};

export default Indicator;
