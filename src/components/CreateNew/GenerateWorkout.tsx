import {useNavigation} from '@react-navigation/native';
import {Box, Button, Flex, Input, Slider, Text} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import useAvaliableData from '../../hooks/useAvailableData';
import {
  DefaultsDefinition,
  MuscleGroup,
  MuscleGroupNames,
  Workout,
  WorkoutByReference,
} from '../../services/types';
import {differenceBy, find} from 'lodash';
import FilterGroup from '../Library/FilterGroup/FilterGroup';

function GenerateWorkout() {
  const [defaultData, setDefaultData] = useState<DefaultsDefinition>();
  const [userSavedWorkouts, setUserSavedWorkouts] =
    useState<WorkoutByReference[]>();
  const [numberOfWorkouts, setNumberOfWorkouts] = useState<number>(10);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroupNames[]>([]);
  const [defaultMuscleGroups, setDefaultMuscleGroups] =
    useState<MuscleGroupNames[]>();
  const [maxSelected, setMaxSelected] = useState<boolean>(false);
  const [availableWorkouts, setAvailableWorkouts] = useState<Workout[]>();
  const {getSavedDefaults, updateSavedWorkouts, getSavedWorkouts} =
    useAvaliableData();
  const navigation = useNavigation();

  useEffect(() => {
    getSavedDefaults((data: DefaultsDefinition) => {
      setAvailableWorkouts(data.workoutList);
      setDefaultMuscleGroups(data.muscleGroups.map(el => el.name));
      setDefaultData(data);
    });
    getSavedWorkouts((data: WorkoutByReference[]) => {
      setUserSavedWorkouts(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (muscleGroup) {
      if (muscleGroup?.length === 3) {
        setMaxSelected(true);
      } else if (muscleGroup?.length < 3 && maxSelected) {
        setMaxSelected(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroup]);

  const isDisabled = (name: MuscleGroupNames) => {
    return maxSelected && muscleGroup?.indexOf(name) === -1;
  };

  const weightMaker = (arr: Workout[]) => {
    return [].concat(
      // @ts-ignore
      ...arr.map(obj => Array(Math.ceil(obj.importance * 100)).fill(obj)),
    );
  };

  const pick = useCallback((arr: Workout[]) => {
    let weighted = weightMaker(arr);
    return weighted[Math.floor(Math.random() * weighted.length)];
  }, []);

  const genWorkout = useCallback((): Workout[] => {
    if (availableWorkouts && muscleGroup && workoutName) {
      const filteredWorkouts = availableWorkouts.filter((el: Workout) => {
        return (
          muscleGroup.indexOf(el.muscleGroup[0]) > -1 ||
          muscleGroup.indexOf(el.muscleGroup[1]) > -1
        );
      });
      const selected: Workout[] = [];
      filteredWorkouts.forEach((_: Workout) => {
        if (selected.length <= numberOfWorkouts) {
          const forceNoDuplicates = differenceBy(
            filteredWorkouts,
            selected,
            (el: Workout) => el.id,
          );
          selected.push(pick(forceNoDuplicates));
        }
      });
      return selected;
    }
    return [];
  }, [availableWorkouts, muscleGroup, numberOfWorkouts, pick, workoutName]);

  const handleSubmit = useCallback(() => {
    if (
      muscleGroup &&
      muscleGroup.length !== 0 &&
      workoutName.length >= 3 &&
      defaultData &&
      userSavedWorkouts
    ) {
      const selected = genWorkout();
      console.log(selected);
      updateSavedWorkouts(
        {
          name: workoutName,
          data: {
            workouts: selected,
            muscleGroups: muscleGroup.map((el: MuscleGroupNames) => ({
              ...(find(defaultData.muscleGroups, {
                name: el,
              }) as MuscleGroup),
            })),
          },
        },
        userSavedWorkouts,
      )
        .then((result: any) => {
          if (!result) {
            Alert.alert('Failed To Create Workout', result);
          } else {
            Alert.alert(`Created ${workoutName} Workout`);
            // @ts-ignore
            navigation.navigate('Home', {
              recentlyCreated: true,
            });
          }
        })
        .catch(err => console.warn(err));
    }
  }, [
    defaultData,
    genWorkout,
    muscleGroup,
    navigation,
    updateSavedWorkouts,
    userSavedWorkouts,
    workoutName,
  ]);

  const tapMuscleGroup = (name: MuscleGroupNames) => {
    if (muscleGroup && muscleGroup?.indexOf(name) > -1) {
      setMuscleGroup(muscleGroup.filter(el => el !== name));
    } else {
      setMuscleGroup((m: MuscleGroupNames[]) => [...m, name]);
    }
  };

  return (
    <Box safeAreaX>
      <Box alignItems="center" w="100%">
        <Text fontSize={18} textAlign="center">
          Workout Name: {workoutName}
        </Text>
        <Input
          value={workoutName}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setWorkoutName(e.nativeEvent.text)
          }
          variant="underlined"
          placeholder="Name"
          mb={6}
          fontSize={16}
        />
        <Text fontSize={18} textAlign="center">
          {numberOfWorkouts} Exercises
        </Text>
        <Slider
          size={'lg'}
          defaultValue={10}
          minValue={7}
          maxValue={20}
          mb={6}
          colorScheme="indigo"
          onChangeEnd={v => {
            v && setNumberOfWorkouts(Math.floor(v));
          }}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text fontSize={18} mb={2} textAlign="center">
          Muscle Group{muscleGroup && muscleGroup.length > 1 ? 's' : ''}{' '}
          {muscleGroup &&
            muscleGroup.length > 0 &&
            `[${muscleGroup && muscleGroup.join(', ')}]`}
        </Text>

        <Flex
          mb={6}
          width={'100%'}
          flexDirection="row"
          flexWrap={'wrap'}
          safeAreaX>
          {defaultMuscleGroups && (
            <FilterGroup
              selectedBackground="#4B9AE7"
              options={defaultMuscleGroups as any[]}
              onTap={tapMuscleGroup}
              isDisabled={isDisabled}
            />
          )}
        </Flex>
        <Button
          w={'100%'}
          isLoading={false}
          isLoadingText="Creating"
          disabled={muscleGroup?.length === 0 && workoutName.length < 3}
          onPress={handleSubmit}>
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default GenerateWorkout;
