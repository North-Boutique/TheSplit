import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Checkbox,
  Input,
  ScrollView,
  Slider,
  Text,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import useAvaliableData from '../../hooks/useAvailableData';
import {MuscleGroupNames, Workout} from '../../services/types';

function GenerateWorkout() {
  const [numberOfWorkouts, setNumberOfWorkouts] = useState<number>(0);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroupNames[]>();
  const [maxSelected, setMaxSelected] = useState<boolean>(false);
  const [availableWorkouts, setAvailableWorkouts] = useState<Workout[]>();
  const {savedData, updateData} = useAvaliableData();
  const navigation = useNavigation();

  useEffect(() => {
    if (
      savedData.defaultData &&
      availableWorkouts &&
      availableWorkouts?.length > 0
    ) {
      setAvailableWorkouts(Object.values(savedData.defaultData.workoutList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData]);

  useEffect(() => {
    if (muscleGroup) {
      if (muscleGroup?.length === 2) {
        setMaxSelected(true);
      } else if (muscleGroup?.length < 2 && maxSelected) {
        setMaxSelected(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroup]);

  const isDisabled = (name: MuscleGroupNames) => {
    return muscleGroup?.indexOf(name) === -1;
  };

  const weightMaker = (arr: Workout[]) => {
    return [].concat(
      // @ts-ignore
      ...arr.map(obj => Array(Math.ceil(obj.imporance * 100)).fill(obj)),
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
      console.log(filteredWorkouts);
      const selected: Workout[] = [];
      filteredWorkouts.forEach((_: Workout) => {
        if (selected.length <= numberOfWorkouts) {
          selected.push(pick(filteredWorkouts));
        }
      });
      return selected;
    }
    return [];
  }, [availableWorkouts, muscleGroup, numberOfWorkouts, pick, workoutName]);

  const handleSubmit = useCallback(() => {
    if (muscleGroup?.length !== 0 && workoutName.length >= 3) {
      const selected = genWorkout();
      updateData({
        key: 'generatedWorkouts',
        name: workoutName,
        data: {excersiseIds: selected.map((el: Workout) => el.id)},
      })
        .then((result: any) => {
          if (!result) {
            Alert.alert('Failed To Create Workout', result);
          } else {
            Alert.alert(`Created ${workoutName} Workout`);
            // @ts-ignore
            navigation.navigate('Home');
          }
        })
        .catch(err => console.log(err));
    }
  }, [genWorkout, muscleGroup?.length, navigation, updateData, workoutName]);

  return (
    <ScrollView w="100%" m={0} p={5}>
      <Box>
        <Text>Generate Workout</Text>
        <Box alignItems="center" w="100%">
          <Text textAlign="center">Workout Name: {workoutName}</Text>
          <Input
            value={workoutName}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setWorkoutName(e.nativeEvent.text)
            }
            variant="underlined"
            placeholder="Name"
          />
          <Text textAlign="center">{numberOfWorkouts} Excersies</Text>
          <Slider
            minValue={5}
            maxValue={15}
            colorScheme="indigo"
            onChangeEnd={v => {
              v && setNumberOfWorkouts(Math.floor(v));
            }}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text textAlign="center">Muscle Group(s)</Text>
          <Checkbox.Group
            onChange={(values: MuscleGroupNames[]) => {
              setMuscleGroup(values);
            }}
            // value={muscleGroup}
            accessibilityLabel="choose muscle group"
            display="inline-flex"
            justifyContent={'space-evenly'}>
            <Checkbox
              isDisabled={isDisabled('Quads') && maxSelected}
              value="Quads">
              Quads
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Biceps') && maxSelected}
              value="Biceps">
              Biceps
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Shoulders') && maxSelected}
              value="Shoulders">
              Shoulders
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Chest') && maxSelected}
              value="Chest">
              Chest
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Triceps') && maxSelected}
              value="Triceps">
              Triceps
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Back') && maxSelected}
              value="Back">
              Back
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Glutes') && maxSelected}
              value="Glutes">
              Glutes
            </Checkbox>
            <Checkbox
              isDisabled={isDisabled('Hamstrings') && maxSelected}
              value="Hamstrings">
              Hamstrings
            </Checkbox>
            <Checkbox isDisabled={isDisabled('Abs') && maxSelected} value="Abs">
              Abs
            </Checkbox>
          </Checkbox.Group>
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
    </ScrollView>
  );
}

export default GenerateWorkout;
