import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

type Props = {
  style?: ViewStyle;
  isLoading?: boolean;
  text?: String;
  textStyle?: TextStyle;
  onPress?: () => void;
};

const AppButton = (props: Props) => {
  const {
    style = {},
    isLoading = false,
    text = 'Unknown',
    textStyle = {},
    onPress = () => {},
  } = props;
  return (
    <TouchableOpacity
      style={{justifyContent: 'center', ...style}}
      onPress={onPress}>
      <View style={{opacity: isLoading ? 0 : 1}}>
        <Text style={{...textStyle}}>{text}</Text>
      </View>
      <View
        style={{
          opacity: !isLoading ? 0 : 1,
          position: 'absolute',
        }}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.white}
          size={textStyle?.fontSize}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
