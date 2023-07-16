import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DefaultsDefinition,
  SplitGroup,
  UpdateUserDataSplits,
  UpdateUserDataWorkouts,
  WorkoutByReference,
} from './types';
import uuid from 'uuid-random';
import {remove} from 'lodash';

const updateSplits = async (
  value: UpdateUserDataSplits,
  current: SplitGroup,
) => {
  try {
    const splitsToSet = [...current, value.data];
    await AsyncStorage.setItem('@LOCAL_SPLITS', JSON.stringify(splitsToSet));
    return splitsToSet;
  } catch (e: any) {
    return e;
  }
};

const updateWorkouts = async (
  value: UpdateUserDataWorkouts,
  current: WorkoutByReference[],
): Promise<WorkoutByReference[]> => {
  try {
    let today: Date | string = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const newValue = {
      id: uuid(),
      name: value.name,
      workouts: value.data.workouts,
      createdAt: today,
      muscleGroups: value.data.muscleGroups,
    };
    const workoutsToSet = [...current, newValue];
    await AsyncStorage.setItem(
      '@LOCAL_WORKOUTS',
      JSON.stringify(workoutsToSet),
    );
    return workoutsToSet;
  } catch (e: any) {
    return e;
  }
};

const deleteSavedWorkout = async (
  identifer: string,
  current: WorkoutByReference[],
): Promise<WorkoutByReference[]> => {
  const userData = current;
  remove(userData, (el: WorkoutByReference) => el.id === identifer);
  console.log(userData, ' Saved Workouts');
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@LOCAL_WORKOUTS', jsonValue);
    return userData;
  } catch (e: any) {
    // saving error
    return e;
  }
};

const getDefaults = async (): Promise<DefaultsDefinition> => {
  try {
    const def = (await AsyncStorage.getItem('@DEFAULTS')) as string;
    return JSON.parse(def) as DefaultsDefinition;
  } catch (e: any) {
    // saving error
    return e;
  }
};

const getWorkouts = async (): Promise<WorkoutByReference[]> => {
  try {
    const wrk = (await AsyncStorage.getItem('@LOCAL_WORKOUTS')) as string;
    return JSON.parse(wrk) as WorkoutByReference[];
  } catch (e: any) {
    // saving error
    return e;
  }
};

const getSplits = async (): Promise<SplitGroup> => {
  try {
    const spl = (await AsyncStorage.getItem('@LOCAL_SPLITS')) as string;
    return JSON.parse(spl) as SplitGroup;
  } catch (e: any) {
    // saving error
    return e;
  }
};

const seedUserData = async (data: DefaultsDefinition) => {
  try {
    const defaultData = JSON.stringify(data);
    await AsyncStorage.setItem('@DEFAULTS', defaultData);
    await AsyncStorage.setItem('@LOCAL_WORKOUTS', '[]');
    await AsyncStorage.setItem('@LOCAL_SPLITS', '[]');
    return true;
  } catch (e) {
    // saving error
    return e;
  }
};

const firstLaunch = async () => {
  try {
    let first = false;
    await AsyncStorage.getItem('@FIRST_LAUNCH').then((value: string | null) => {
      if (value === null) {
        AsyncStorage.setItem('@FIRST_LAUNCH', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        first = true;
      }
    });
    return first;
  } catch (e: any) {
    // saving error
    return e;
  }
};

export {
  getDefaults,
  getWorkouts,
  getSplits,
  seedUserData,
  deleteSavedWorkout,
  updateWorkouts,
  updateSplits,
  firstLaunch,
};
