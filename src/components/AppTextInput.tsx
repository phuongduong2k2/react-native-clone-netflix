import {
  TextInput,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {AppDimention, AppFonts} from '../constants/constants';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AppColors from '../constants/AppColors';
import ImageIcon from './ImageIcon';
import AppIcons from '../constants/AppIcons';

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
  isPassword?: boolean;
  iconTheme?: 'dark' | 'light';
  heightContainer?: number;
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
    isPassword = false,
    iconTheme = 'light',
    heightContainer = 64,
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

  const IconTheme = {
    eye: iconTheme === 'light' ? AppIcons.eye : AppIcons.dark_eye,
    eye_slash:
      iconTheme === 'light' ? AppIcons.eye_slash : AppIcons.dark_eye_slash,
  };
  const animBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animValue.value,
      [0, 1],
      [blurColor, focusColor],
    ),
  }));

  const animContainer = useAnimatedStyle(() => ({
    top: interpolate(
      animValue.value,
      [0, 1],
      [(heightContainer - 20 - 9) / 2, 4],
    ),
  }));

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

  const [visiblePassword, setVisiblePassword] = useState(false);

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <Animated.View
      style={[
        {
          justifyContent: 'space-between',
          flexDirection: 'row',
          ...containerStyle,
          height: heightContainer,
        },
        animBackgroundColor,
      ]}
      // onLayout={e => {
      //   if (
      //     e.nativeEvent.layout.height > 0 &&
      //     height.value !== e.nativeEvent.layout.height
      //   ) {
      //     height.value = e.nativeEvent.layout.height;
      //   }
      // }}
    >
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
          flex: 1,
          height: '100%',
          margin: 0,
          paddingLeft: AppDimention.secondPadding,
          borderRadius: 4,
          fontFamily: AppFonts.regular,
          fontSize: 16,
          ...textStyle,
        }}
        secureTextEntry={isPassword && !visiblePassword}
        onChangeText={e => {
          setText(e);
          onChangeText(e);
        }}
        onFocus={focus}
        onBlur={blur}
        onEndEditing={onEndEditing}
      />
      {isPassword && text.length > 0 && (
        <TouchableOpacity
          onPress={togglePassword}
          style={{
            justifyContent: 'center',
            paddingHorizontal: AppDimention.secondPadding,
          }}>
          <ImageIcon
            source={visiblePassword ? IconTheme.eye_slash : IconTheme.eye}
          />
        </TouchableOpacity>
      )}
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
