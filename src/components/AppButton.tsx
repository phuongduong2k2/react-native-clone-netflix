import {
  ColorValue,
  DimensionValue,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

type Props = {
  style?: ViewStyle;
  isLoading?: boolean;
  textStyle?: TextStyle;
  onPress?: () => void;
  Icon?: any;
  iconStyles?: {
    height?: DimensionValue;
    width?: DimensionValue;
    fill?: ColorValue;
  };
  text?: String;
  disable?: Boolean;
};

const AppButton = (props: Props) => {
  const {
    style = {
      height: 48,
    },
    isLoading = false,
    onPress = () => {},
    Icon = null,
    text = '',
    iconStyles = {
      height: 10,
      width: 10,
    },
    disable = false,
    textStyle = {},
  } = props;

  const onPressing = () => (disable ? {} : onPress);

  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : 0.7}
      style={{
        justifyContent: 'center',
        ...style,
        backgroundColor: disable ? '#292929' : style?.backgroundColor,
      }}
      onPress={onPressing}>
      <View
        style={{
          opacity: isLoading ? 0 : 1,
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Icon && (
          <Icon
            height={iconStyles.height}
            width={iconStyles.width}
            fill={disable ? '#737373' : iconStyles.fill}
          />
        )}
        <Text
          style={{...textStyle, color: disable ? '#737373' : textStyle?.color}}>
          {text}
        </Text>
      </View>
      <View
        style={{
          opacity: !isLoading ? 0 : 1,
          position: 'absolute',
          alignSelf: 'center',
        }}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.black}
          size={'small'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(AppButton);
