import {Box, Checkbox, CheckIcon, Select, Slider, Text} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {MuscleGroupNames} from '../../services/types';

function GenerateWorkout() {
  const [numberOfWorkouts, setNumberOfWorkouts] = useState<number>(0);
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroupNames[]>();
  const [maxSelected, setMaxSelected] = useState<boolean>(false);

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

  const isDisabled = useCallback(
    (name: MuscleGroupNames) => {
      return !muscleGroup?.indexOf(name) && maxSelected;
    },
    [maxSelected, muscleGroup],
  );

  return (
    <Box>
      <Text>Generate Workout</Text>
      <Box alignItems="center" w="100%">
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
          onChange={setMuscleGroup}
          value={muscleGroup}
          accessibilityLabel="choose muscle group"
          display="inline-flex"
          justifyContent={'space-evenly'}>
          <Checkbox isDisabled={isDisabled('Quads')} value="Quads">
            Quads
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Quads')} value="Biceps">
            Biceps
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Shoulders')} value="Shoulders">
            Shoulders
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Chest')} value="Chest">
            Chest
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Triceps')} value="Triceps">
            Triceps
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Back')} value="Back">
            Back
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Glutes')} value="Glutes">
            Glutes
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Hamstrings')} value="Hamstrings">
            Hamstrings
          </Checkbox>
          <Checkbox isDisabled={isDisabled('Abs')} value="Abs">
            Abs
          </Checkbox>
        </Checkbox.Group>
      </Box>
    </Box>
  );
}

export default GenerateWorkout;
