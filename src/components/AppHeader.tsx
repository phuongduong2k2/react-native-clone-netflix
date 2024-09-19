import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React, {memo} from 'react';
import {AppDimention, AppFonts} from '../constants/constants';

type Props = {
  children?: React.ReactNode[];
  title?: string;
  containerStyle?: ViewStyle;
  textStyles?: TextStyle;
};

const AppHeader = (props: Props) => {
  const {
    children = [],
    title = 'Title',
    containerStyle = {},
    textStyles = {},
  } = props;

  return (
    <View
      style={{
        height: 56,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}>
      <View
        style={{
          height: '100%',
          width: '50%',
          position: 'absolute',
          left: AppDimention.mainPadding,
          justifyContent: 'center',
        }}>
        {children[0]}
      </View>
      <Text
        style={{
          fontFamily: AppFonts.regular,
          color: 'black',

          ...textStyles,
        }}>
        {title}
      </Text>
      <View
        style={{
          height: '100%',
          width: '50%',
          position: 'absolute',
          justifyContent: 'center',
          right: AppDimention.mainPadding,
          alignItems: 'flex-end',
        }}>
        {children[1]}
      </View>
    </View>
  );
};

export default memo(AppHeader);
