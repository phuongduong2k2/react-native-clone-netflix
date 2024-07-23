import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MovieItemProps} from '../types';

export type RootStackParamList = {
  LoginScreen: {} | undefined;
  RegisterScreen: {} | undefined;
  StartedScreen: {} | undefined;
  CreateAccountScreen: {} | undefined;
  HomeScreen: {} | undefined;
  HomeNavigatorScreen: {} | undefined;
  WatchingScreen: MovieItemProps;
};

const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
};

export default useAppNavigation;
