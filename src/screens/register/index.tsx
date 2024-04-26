import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppContainer from '../../components/AppContainer';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <AppContainer>
      <View
        style={{
          flex: 1,
        }}></View>
    </AppContainer>
  );
};

export default RegisterScreen;
