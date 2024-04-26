import {
  View,
  Text,
  TextInput,
  Keyboard,
  Button,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppDimention, AppFonts} from '../../constants/constants';
import Animated, {
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
};

const CustomTextInput = (props: Props) => {
  const {
    containerStyle = {},
    onChangeText = () => {},
    onBlur = () => {},
    onFocus = () => {},
    onEndEditing = () => {},
  } = props;
  const textInputRef = useRef<TextInput>(null);

  const [height, setHeight] = useState(0);
  const [heightText, setHeightText] = useState(0);
  const [text, setText] = useState('');

  const animValue = useSharedValue(0);

  const animBoder = useAnimatedStyle(() => ({
    borderColor: interpolateColor(animValue.value, [0, 1], ['grey', '#006AFF']),
  }));

  const animText = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          animValue.value,
          [0, 1],
          [0, -((AppDimention.secondPadding + 4) * 0.7)],
        ),
      },
      {scale: interpolate(animValue.value, [0, 1], [1, 0.7])},
    ],
    top: interpolate(
      animValue.value,
      [0, 1],
      [(height - heightText) / 2, -(heightText / 2)],
    ),
  }));

  const keyboardEvent = useKeyboardEvent();

  useEffect(() => {
    if (keyboardEvent === 'didShow') {
      animValue.value = withTiming(1, {duration: 200});
    }
    if (keyboardEvent === 'didHide' && text.length === 0) {
      animValue.value = withTiming(0, {duration: 200});
    }
  }, [keyboardEvent]);

  console.log('render');

  return (
    <View
      style={{justifyContent: 'center', height: 64, ...containerStyle}}
      onLayout={e => {
        if (
          e.nativeEvent.layout.height > 0 &&
          height !== e.nativeEvent.layout.height
        ) {
          setHeight(e.nativeEvent.layout.height);
        }
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: 'white',
            paddingHorizontal: 4,
            position: 'absolute',
            marginLeft: AppDimention.secondPadding - 4,
            alignSelf: 'flex-start',
          },
          animText,
        ]}
        onLayout={e => {
          if (
            e.nativeEvent.layout.height > 0 &&
            heightText !== e.nativeEvent.layout.height
          ) {
            setHeightText(e.nativeEvent.layout.height);
          }
        }}>
        <Text
          style={[
            {
              color: 'grey',

              fontFamily: AppFonts.regular,
              margin: 0,
              fontSize: 20,
            },
          ]}>
          Email
        </Text>
      </Animated.View>
      <TextInput
        ref={textInputRef}
        style={{
          zIndex: 1,
          height: '100%',
          paddingLeft: AppDimention.secondPadding,
          borderRadius: 4,
        }}
        onChangeText={e => {
          setText(e);
          onChangeText(e);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
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

export default React.memo(CustomTextInput);
