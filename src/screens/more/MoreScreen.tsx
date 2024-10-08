import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import {AppFonts} from '../../constants/constants';

const MoreScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, marginTop: insets.top}}>
      <AppHeader
        title="More"
        containerStyle={{backgroundColor: 'black'}}
        textStyles={{color: 'white', fontFamily: AppFonts.bold}}>
        <></>
        <></>
      </AppHeader>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({});
