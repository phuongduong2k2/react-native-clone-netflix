import {View, Text, Image} from 'react-native';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import {RouteProp, useRoute} from '@react-navigation/native';
import useAppNavigation, {
  RootStackParamList,
} from '../../navigation/useAppNavigation';
import AppButton from '../../components/AppButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import YoutubePlayer from 'react-native-youtube-iframe';

interface Props {}
type WatchingScreenProps = RouteProp<RootStackParamList, 'WatchingScreen'>;

const WatchingScreen = (props: Props) => {
  const {} = props;
  const route = useRoute<WatchingScreenProps>();
  const {name, thumbnail, trailerVideoId} = route.params;
  const navigation = useAppNavigation();

  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <AppContainer>
      <View style={{flex: 1, marginTop: insets.top}}>
        <View
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 16 / 9,
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: 'grey',
            overflow: 'hidden',
          }}>
          <YoutubePlayer
            height={300}
            play={false}
            videoId={trailerVideoId ?? ''}
            onChangeState={() => {}}
          />
        </View>
        <Image source={thumbnail} style={{width: 100, height: 100}} />
        <AppButton text={name} onPress={goBack} style={{borderWidth: 1}} />
        <Text>{name}</Text>
      </View>
    </AppContainer>
  );
};

export default WatchingScreen;
