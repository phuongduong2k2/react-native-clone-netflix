import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import useAppNavigation from '../../navigation/useAppNavigation';

type Props = {};

const SplashScreen = (props: Props) => {
  const videoRef = useRef<VideoRef>(null);
  const video = require('../../../assets/plash/splash.mp4');

  const navigation = useAppNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Video
        source={video}
        style={{width: '100%', height: undefined, aspectRatio: 1772 / 1284}}
        ref={videoRef}
        onLoad={() => {
          console.log('Loading');
        }}
        onEnd={() => {
          navigation.replace('HomeNavigator');
        }}
      />
    </View>
  );
};

export default SplashScreen;
