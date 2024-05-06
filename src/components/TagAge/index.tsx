import {View, Text} from 'react-native';
import React from 'react';
import {AppFonts} from '../../constants/constants';

const TagAge = () => {
  return (
    <View style={{borderWidth: 1, borderColor: 'white', marginHorizontal: 4}}>
      <Text style={{fontFamily: AppFonts.regular, color: 'white'}}> 16+ </Text>
    </View>
  );
};

export default TagAge;
