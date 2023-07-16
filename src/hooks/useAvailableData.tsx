import {useCallback, useEffect, useState} from 'react';
import {
  DefaultsDefinition,
  SplitGroup,
  UpdateUserDataSplits,
  UpdateUserDataWorkouts,
  WorkoutByReference,
} from '../services/types';
import {
  deleteSavedWorkout,
  getDefaults,
  getSplits,
  getWorkouts,
  updateSplits,
  updateWorkouts,
} from '../services/Storage';

function useAvaliableData() {
  const getSavedDefaults = async (cb: (data: DefaultsDefinition) => void) => {
    const data = await getDefaults();
    cb(data);
  };
  const getSavedWorkouts = async (cb: (data: WorkoutByReference[]) => void) => {
    const data = await getWorkouts();
    cb(data);
  };
  const getSavedSplits = async (cb: (data: SplitGroup) => void) => {
    const data = await getSplits();
    cb(data);
  };

  const updateSavedWorkouts = async (
    value: UpdateUserDataWorkouts,
    currentWorkouts: WorkoutByReference[],
  ) => {
    await updateWorkouts(value, currentWorkouts);
    return true;
  };

  const updateSavedSplits = async (
    value: UpdateUserDataSplits,
    current: SplitGroup,
  ) => {
    await updateSplits(value, current);
    return true;
  };

  const deleteWorkout = async (
    identifer: string,
    savedWorkouts: WorkoutByReference[],
    cb: (data: WorkoutByReference[]) => void,
  ) => {
    const newWorkouts = await deleteSavedWorkout(identifer, savedWorkouts);
    cb(newWorkouts);
  };

  return {
    getSavedWorkouts,
    updateSavedWorkouts,
    getSavedSplits,
    updateSavedSplits,
    deleteWorkout,
    getSavedDefaults,
  };
}

export default useAvaliableData;
