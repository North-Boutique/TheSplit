import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_USER_DATA,
  UpdateUserDataSplits,
  UpdateUserDataWorkouts,
  UserData,
} from './types';

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
      userData.generatedWorkouts[value.name] = value.data;
      break;
  }
  try {
    const jsonValue = JSON.stringify(userData);
    return await AsyncStorage.mergeItem('@LOCAL_USER', jsonValue);
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
  console.log(data);
  try {
    const jsonValue = JSON.stringify(data);
    return await AsyncStorage.setItem('@LOCAL_USER', jsonValue);
  } catch (e) {
    // saving error
    return e;
  }
};

export {updateUserData, getData, seedUserData};
