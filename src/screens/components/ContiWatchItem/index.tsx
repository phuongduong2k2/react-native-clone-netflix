import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import AppSvg from '../../../components/AppSvg';
import {AppIcons} from '../../../constants/AppIcons';
import {MovieItemProps} from '../../../types';

type Props = {
  data: MovieItemProps;
};

const ContiWatchItem = (props: Props) => {
  const {data} = props;
  return (
    <View
      style={{
        width: 106,
        height: 188,
        backgroundColor: '#191919',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={data.thumbnail} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            position: 'absolute',
            width: '50%',
            height: undefined,
            aspectRatio: 1,
            borderWidth: 1,
            borderRadius: 100,
            borderColor: '#FFE9E9',
            overflow: 'hidden',
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              zIndex: 1,
              padding: 8,
            }}>
            <AppIcons.play height="100%" width="100%" fill="white" />
          </View>
          <View
            style={{
              height: '100%',
              zIndex: 0,
              width: '100%',
              position: 'absolute',
              backgroundColor: 'black',
              opacity: 0.7,
            }}
          />
        </TouchableOpacity>
      </View>
      <Progress.Bar
        progress={0.5}
        width={null}
        height={3}
        style={{
          borderRadius: 0,
          width: '100%',
          borderWidth: 0,
        }}
        color="#D22F26"
        borderColor="transparent"
        unfilledColor="#D9D9D9"
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: undefined,
            aspectRatio: 1,
            padding: 5,
          }}>
          <AppIcons.info height={'100%'} width={'100%'} fill="#B2B2B2" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '100%',
            width: undefined,
            aspectRatio: 1,
            padding: 5,
          }}>
          <AppIcons.more_circle height={'100%'} width={'100%'} fill="#B2B2B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContiWatchItem;
