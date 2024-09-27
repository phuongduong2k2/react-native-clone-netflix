import {View, ViewStyle} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

type Props = {
  source: string;
  styles?: ViewStyle;
  useSkeleton?: boolean;
};

const LazyImage = (props: Props) => {
  const {source = '', styles = {}, useSkeleton = true} = props;
  const [loading, setLoading] = useState(true);

  const onLoadDone = () => {
    setLoading(false);
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: useSkeleton ? opacity.value : 1,
  }));

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [loading, opacity]);

  return (
    <View style={styles}>
      {loading && useSkeleton && (
        <SkeletonPlaceholder
          backgroundColor="rgb(65, 65, 65)"
          highlightColor="rgb(134, 134, 134)"
          borderRadius={4}
          speed={1500}>
          <SkeletonPlaceholder.Item height={'100%'} width={'100%'} />
        </SkeletonPlaceholder>
      )}
      {source && (
        <Animated.View
          style={[
            {height: '100%', width: '100%', zIndex: 2, position: 'absolute'},
            animatedStyles,
          ]}>
          <FastImage
            onLoadEnd={onLoadDone}
            onLoadStart={onLoadStart}
            style={{height: '100%', width: '100%'}}
            source={{
              uri: source,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default memo(LazyImage);
