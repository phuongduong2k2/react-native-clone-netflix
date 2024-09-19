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
import {AppDimention, AppFonts} from '../constants/constants';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AppColors from '../constants/AppColors';

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
  focusBorderColor?: string;
  blurBorderColor?: string;
  borderStyle?: ViewStyle;
  focusColor?: string;
  blurColor?: string;
  focusPlaceholder?: string;
  blurPlaceholder?: string;
};

const AppTextInput = (props: Props) => {
  const {
    containerStyle = {},
    onChangeText = () => {},
    onBlur = () => {},
    onFocus = () => {},
    onEndEditing = () => {},
    placeholder = '',
    textStyle = {},
    placeholderStyle = {fontSize: 20},
    focusBorderColor = '#006AFF',
    blurBorderColor = 'grey',
    borderStyle = {},
    focusColor = 'transparent',
    blurColor = 'transparent',
    focusPlaceholder = AppColors.mainText,
    blurPlaceholder = AppColors.mainText,
  } = props;
  const textInputRef = useRef<TextInput>(null);

  const [text, setText] = useState('');

  const [isFocus, setFocus] = useState(false);

  const animValue = useSharedValue(0);
  const height = useSharedValue(0);

  const animBoder = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      animValue.value,
      [0, 1],
      [blurBorderColor, focusBorderColor],
    ),
  }));

  const animText = useAnimatedStyle(() => ({
    fontSize: interpolate(animValue.value, [0, 1], [20, 12]),
    color: interpolateColor(
      animValue.value,
      [0, 1],
      [blurPlaceholder, focusPlaceholder],
    ),
  }));

  const animBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animValue.value,
      [0, 1],
      [blurColor, focusColor],
    ),
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
    <Animated.View
      style={[
        {justifyContent: 'center', height: 64, ...containerStyle},
        animBackgroundColor,
      ]}
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
              fontFamily: AppFonts.regular,
              margin: 0,
              fontSize: 20,
              ...placeholderStyle,
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
            ...borderStyle,
          },
          animBoder,
        ]}
      />
    </Animated.View>
  );
};

export default memo(AppTextInput);
