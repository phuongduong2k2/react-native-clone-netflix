import {View} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type Props = {
  children?: React.ReactNode;
  backgroundColor?: string;
};

const AppContainer = (props: Props) => {
  const {children, backgroundColor = 'black'} = props;
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, backgroundColor}}>{children}</View>
    </SafeAreaProvider>
  );
};

export default AppContainer;
