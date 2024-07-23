import {ImageSourcePropType} from 'react-native';

type MovieItemProps = {
  id: number;
  name: string;
  thumbnail: ImageSourcePropType;
  trailerVideoId: string;
};

export type {MovieItemProps};
