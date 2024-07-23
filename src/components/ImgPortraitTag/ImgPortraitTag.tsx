import {Image, ImageSourcePropType} from 'react-native';
import React from 'react';
import AppImages from '../../constants/AppImages';

type Props = {
  source: ImageSourcePropType;
};

const ImgPortraitTag = (props: Props) => {
  const {source} = props;
  return (
    <>
      <Image
        source={AppImages.nNetflix}
        style={{
          resizeMode: 'contain',
          position: 'absolute',
          zIndex: 1,
          height: undefined,
          width: 10,
          aspectRatio: 54 / 96,
          top: 5,
          left: 5,
        }}
      />
      <Image source={source} style={{resizeMode: 'cover', height: '100%'}} />
    </>
  );
};

export default ImgPortraitTag;
