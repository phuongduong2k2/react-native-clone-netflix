import {InteractionManager, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Indicator from './Indicator';

type Props = {
  children?: React.ReactNode;
  backgroundColor?: string;
};

const AppContainer = (props: Props) => {
  const {children, backgroundColor = 'black'} = props;

  const [isReady, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });

    return () => {
      setReady(false);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{flex: 1, backgroundColor}}>
        {isReady ? (
          children
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Indicator />
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default AppContainer;
