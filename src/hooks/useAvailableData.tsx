import {useCallback, useEffect, useState} from 'react';
import {
  DEFAULT_USER_DATA,
  UpdateUserDataSplits,
  UpdateUserDataWorkouts,
  UserData,
} from '../services/types';
import {getData, updateUserData} from '../services/Storage';

function useAvaliableData() {
  const [savedData, setSavedData] = useState<UserData>(DEFAULT_USER_DATA);
  const [updateInMemory, setUpdateInMemory] = useState<boolean>(true);

  const updateData = useCallback(
    async (value: UpdateUserDataSplits | UpdateUserDataWorkouts) => {
      setUpdateInMemory(true);
      return await updateUserData(value, savedData);
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

  return {savedData, updateData, setSaved};
}

export default useAvaliableData;
