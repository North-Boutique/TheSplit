import {useCallback, useEffect, useState} from 'react';
import {
  DEFAULT_USER_DATA,
  UpdateUserDataSplits,
  UpdateUserDataWorkouts,
  UserData,
} from '../services/types';
import {getData, updateUserData, deleteSavedWorkout} from '../services/Storage';

function useAvaliableData() {
  const [savedData, setSavedData] = useState<UserData>(DEFAULT_USER_DATA);
  const [updateInMemory, setUpdateInMemory] = useState<boolean>(true);

  const updateData = useCallback(
    async (value: UpdateUserDataSplits | UpdateUserDataWorkouts) => {
      const recentData = await getData();
      return await updateUserData(value, recentData);
    },
    [],
  );

  const deleteWorkout = useCallback(
    async (identifier: string) => {
      setUpdateInMemory(true);
      return await deleteSavedWorkout(identifier, savedData);
    },
    [savedData],
  );

  const setSaved = () => {
    getData().then(data => {
      setSavedData(data);
    });
  };

  useEffect(() => {
    if (updateInMemory) {
      setSaved();
      setUpdateInMemory(false);
    }
  }, [updateInMemory]);

  return {savedData, updateData, setSaved, deleteWorkout};
}

export default useAvaliableData;
