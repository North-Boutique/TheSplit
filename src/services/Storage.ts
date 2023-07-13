import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_USER_DATA,
  UpdateUserDataSplits,
  UpdateUserDataWorkouts,
  UserData,
  WorkoutByReference,
} from './types';
import uuid from 'uuid-random';
import {findIndex} from 'lodash';

const updateUserData = async (
  value: UpdateUserDataSplits | UpdateUserDataWorkouts,
  currentUserData: UserData,
) => {
  const userData = currentUserData;
  switch (value.key) {
    case 'generatedSplits':
      userData.generatedSplits = [...userData.generatedSplits, value.data];
      break;
    case 'generatedWorkouts':
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
      userData.generatedWorkouts.push(newValue);
      break;
  }
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@LOCAL_USER', jsonValue);
    return true;
  } catch (e) {
    // saving error
    return e;
  }
};

const deleteSavedWorkout = async (
  identifer: string,
  currentUserData: UserData,
) => {
  const userData = currentUserData;
  console.log(userData.generatedWorkouts);
  const idx = findIndex(
    userData.generatedWorkouts,
    (el: WorkoutByReference) => el.id === identifer,
  );
  userData.generatedWorkouts.splice(idx, 1);
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@LOCAL_USER', jsonValue);
    return true;
  } catch (e) {
    // saving error
    return e;
  }
};

const getData = async (): Promise<UserData> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@LOCAL_USER');
    return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_USER_DATA;
  } catch (e: string | any) {
    // error reading value
    return DEFAULT_USER_DATA;
  }
};

const seedUserData = async (data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    return await AsyncStorage.setItem('@LOCAL_USER', jsonValue);
  } catch (e) {
    // saving error
    return e;
  }
};

export {updateUserData, getData, seedUserData, deleteSavedWorkout};
