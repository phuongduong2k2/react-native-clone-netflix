import {
  View,
  Text,
  TextInput,
  Keyboard,
  Button,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextStyle,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {AppDimention, AppFonts} from '../../constants/constants';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useKeyboardEvent} from '../../utils/utils';

type Props = {
  containerStyle?: ViewStyle;
  onChangeText?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  placeholder?: string;
  textStyle?: TextStyle;
  placeholderStyle?: TextStyle;
};

const CustomTextInput = (props: Props) => {
  const {
    containerStyle = {},
    onChangeText = () => {},
    onBlur = () => {},
    onFocus = () => {},
    onEndEditing = () => {},
    placeholder = '',
    textStyle = {},
    placeholderStyle = {fontSize: 20},
  } = props;
  const textInputRef = useRef<TextInput>(null);

  // const [height, setHeight] = useState(0);
  const [heightText, setHeightText] = useState(0);
  const [text, setText] = useState('');

  const [isFocus, setFocus] = useState(false);

  const animValue = useSharedValue(0);
  const height = useSharedValue(0);

  const animBoder = useAnimatedStyle(() => ({
    borderColor: interpolateColor(animValue.value, [0, 1], ['grey', '#006AFF']),
  }));

  const animText = useAnimatedStyle(() => ({
    fontSize: interpolate(animValue.value, [0, 1], [20, 12]),
  }));

  const animContainer = useAnimatedStyle(
    () => ({
      top: interpolate(
        animValue.value,
        [0, 1],
        [(height.value - 20 - 9) / 2, 4],
      ),
    }),
    [height],
  );

  useEffect(() => {
    if (isFocus) {
      animValue.value = withTiming(1, {duration: 200});
    } else if (text.length === 0) {
      animValue.value = withTiming(0, {duration: 200});
    }
  }, [isFocus]);

  const focus = () => {
    setFocus(true);
    onFocus();
  };

  const blur = () => {
    setFocus(false);
    onBlur();
  };

  console.log('render [CusteomTextInput]', placeholder);

  return (
    <View
      style={{justifyContent: 'center', height: 64, ...containerStyle}}
      onLayout={e => {
        if (
          e.nativeEvent.layout.height > 0 &&
          height.value !== e.nativeEvent.layout.height
        ) {
          height.value = e.nativeEvent.layout.height;
        }
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: AppDimention.secondPadding,
          },
          animContainer,
        ]}>
        <Animated.Text
          style={[
            {
              color: 'grey',
              fontFamily: AppFonts.regular,
              margin: 0,
              fontSize: 20,
            },
            animText,
          ]}>
          {placeholder}
        </Animated.Text>
      </Animated.View>
      <TextInput
        ref={textInputRef}
        style={{
          zIndex: 1,
          height: '100%',
          paddingLeft: AppDimention.secondPadding,
          borderRadius: 4,
          fontFamily: AppFonts.regular,
          fontSize: 16,
          ...textStyle,
        }}
        onChangeText={e => {
          setText(e);
          onChangeText(e);
        }}
        onFocus={focus}
        onBlur={blur}
        onEndEditing={onEndEditing}
      />
      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            height: '100%',
            borderWidth: 1,
            borderRadius: 4,
            zIndex: -1,
            position: 'absolute',
            width: '100%',
          },
          animBoder,
        ]}
      />
    </View>
  );
};

export default memo(CustomTextInput);
