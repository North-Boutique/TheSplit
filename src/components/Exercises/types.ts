import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigationTypes';

export type ExercisesProps = NativeStackScreenProps<
  RootStackParamList,
  'Exercises'
>;

export type ExerciseDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'Exercise Details'
>;
