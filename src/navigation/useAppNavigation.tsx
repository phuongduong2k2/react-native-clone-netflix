import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: {} | undefined;
  RegisterScreen: {} | undefined;
  StartedScreen: {} | undefined;
  CreateAccountScreen: {} | undefined;
  HomeScreen: {} | undefined;
};

const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
};

export default useAppNavigation;
