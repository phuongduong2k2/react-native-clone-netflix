import {ImageSourcePropType} from 'react-native';

type MovieItemProps = {
  id: number;
  name: string;
  description: string;
  cast: string;
  portrait: string;
  landscape: string;
  releasedYear: string;
  trailerVideoId: string;
};

export type {MovieItemProps};
