import {Box, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImportantMappings, Workout} from '../../services/types';
import BottomTabBar from '../Navigation/BottomTabBar';
import {ExerciseDetailsProps} from './types';

function ShowExerciseDetails({route, navigation}: ExerciseDetailsProps) {
  const params = route.params;
  const [renderedData, setRenderedData] = useState<Workout>();

  useEffect(() => {
    if (params?.selectedExercise) {
      setRenderedData(params.selectedExercise);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack flex={1} justifyContent="space-between">
      {renderedData && (
        <Box mt={5} mb={2} alignSelf="center">
          <Text fontSize="2xl" fontWeight={700}>
            {renderedData.name}
          </Text>
          <Box>
            <Text fontSize="xl">{renderedData.description}</Text>
          </Box>
          <Box>
            <Text fontSize="xl">
              {ImportantMappings[renderedData.importance]}
            </Text>
            <Text>[{renderedData.muscleGroup.join(', ')}]</Text>
          </Box>
        </Box>
      )}
      <BottomTabBar navigation={navigation} active="Exercises" />
    </VStack>
  );
}

export default ShowExerciseDetails;
