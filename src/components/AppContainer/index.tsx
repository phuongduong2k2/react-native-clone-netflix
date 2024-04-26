import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type Props = {
  children?: React.ReactNode;
};

const AppContainer = (props: Props) => {
  const {children} = props;
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, backgroundColor: 'black'}}>{children}</View>
    </SafeAreaProvider>
  );
};

export default AppContainer;
