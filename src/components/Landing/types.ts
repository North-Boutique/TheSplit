import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigationTypes';

export type LandingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type WorkoutDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'Workout Details'
>;
