import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';
import {
  DefaultsDefinition,
  ImportantMappings,
  WorkoutList,
} from '../../services/types';
import useAvaliableData from '../../hooks/useAvailableData';
import {ExercisesProps} from './types';

function Exercises({navigation}: ExercisesProps) {
  const [renderedExercises, setRenderedExercises] = useState<WorkoutList>();
  // const [dataToBeChanged, setDataToBeChanged] = useState<boolean>(false);
  const {getSavedDefaults} = useAvaliableData();

  useEffect(() => {
    getSavedDefaults((data: DefaultsDefinition) => {
      setRenderedExercises(data.workoutList);
    });
  }, []);

  return (
    <VStack flex={1} justifyContent="space-between">
      <Box />
      {renderedExercises && renderedExercises.length > 0 && (
        <FlatList
          data={renderedExercises}
          renderItem={({item}) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'muted.50',
              }}
              borderColor="muted.800"
              pl={['0', '4']}
              pr={['0', '5']}
              py="2">
              <HStack
                safeAreaX={5}
                space={[2, 3]}
                justifyContent="space-between">
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    bold>
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {item.description}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    {item.muscleGroup.join(', ')}
                  </Text>
                </VStack>
                <Text>{ImportantMappings[item.importance]}</Text>
              </HStack>
            </Box>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <BottomTabBar navigation={navigation} active="Exercises" />
    </VStack>
  );
}

export default Exercises;
