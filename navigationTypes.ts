import {WorkoutByReference} from './src/services/types';

export type RootStackParamList = {
  Home: {recentlyCreated: boolean} | undefined;
  Splits: undefined;
  'Create New': {genType: 'Workout' | 'Split'} | undefined;
  Exercises: undefined;
  'Exercise Details': {selectedWorkout: WorkoutByReference} | undefined;
};
