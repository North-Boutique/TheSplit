import AsyncStorage from '@react-native-async-storage/async-storage';
import {MuscleGroups, WorkoutList} from './types';

const storeData = async (value: any, key: 'MuscleGroups' | 'Workouts') => {
  try {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    // saving error
    return e;
  }
};

const getData = async (
  key: 'MuscleGroups' | 'Workouts',
): Promise<MuscleGroups | WorkoutList> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: string | any) {
    // error reading value
    return {};
  }
};

export {storeData, getData};
