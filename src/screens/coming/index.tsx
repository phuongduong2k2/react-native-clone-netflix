import {View, Text} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';

const ComingSoonScreen = () => {
  return (
    <View style={{flex: 1}}>
      <AppHeader />
      <View style={{borderWidth: 1, borderColor: 'red', height: 100}}></View>
    </View>
  );
};

export default ComingSoonScreen;
