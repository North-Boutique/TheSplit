import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigationTypes';

export type GeneratorTypes = 'Split' | 'Workout' | 'None';

export type CreateNewProps = NativeStackScreenProps<
  RootStackParamList,
  'Create New'
>;
