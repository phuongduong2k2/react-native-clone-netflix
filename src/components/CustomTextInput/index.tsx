import {View, Text, TextInput, Keyboard, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppDimention} from '../../constants/constants';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CustomTextInput = () => {
  const textInputRef = useRef<TextInput>(null);
  const TextInputAnim = Animated.createAnimatedComponent(TextInput);

  const [isFocused, setFocused] = useState(false);

  const animValue = useSharedValue(1);

  const animChanged = useAnimatedStyle(() => ({
    borderColor: interpolateColor(animValue.value, [0, 1], ['grey', 'blue']),
  }));

  useEffect(() => {
    animValue.value = withTiming(isFocused ? 1 : 0, {duration: 1000});
  }, [isFocused]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('Keyboard Shown');
      setFocused(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      console.log('Keyboard Hidden');
      //   setFocused(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{justifyContent: 'center', height: 64}}>
      <Text
        style={{
          color: 'blue',
          position: 'absolute',
          zIndex: 0,
          paddingLeft: AppDimention.secondPadding,
        }}>
        {isFocused.toString()}
      </Text>
      <TextInputAnim
        ref={textInputRef}
        onBlur={() => {
          setFocused(false);
        }}
        // onFocus={() => {
        //   setFocused(true);
        // }}
        // placeholder="Email"
        style={[
          {
            zIndex: 1,
            borderWidth: 1,
            height: '100%',
            paddingLeft: AppDimention.secondPadding,
            borderRadius: 4,
          },
          animChanged,
        ]}
      />
      <View
        style={{
          backgroundColor: 'transparent',
          height: '100%',
          borderRadius: 4,
          zIndex: -1,
          position: 'absolute',
          width: '100%',
        }}
      />
    </View>
  );
};

export default CustomTextInput;
