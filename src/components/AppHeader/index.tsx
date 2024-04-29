import {View, Text, Button, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAppNavigation from '../../navigation/useAppNavigation';
import {AppFonts} from '../../constants/constants';

type Props = {
  children?: React.ReactNode[];
  title?: string;
  containerStyle?: ViewStyle;
};

const AppHeader = (props: Props) => {
  const {children = [], title = 'Title', containerStyle = {}} = props;
  const insets = useSafeAreaInsets();
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
          left: 0,
        }}>
        {children[0]}
      </View>
      <Text
        style={{
          fontFamily: AppFonts.regular,
          color: 'black',
          fontWeight: '700',
        }}>
        {title}
      </Text>
      <View
        style={{
          height: '100%',
          width: '50%',
          position: 'absolute',
          right: 0,
        }}>
        {children[1]}
      </View>
    </View>
  );
};

export default memo(AppHeader);
