import {Box, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';
import {
  DefaultsDefinition,
  ImportantMappings,
  WorkoutList,
} from '../../services/types';
import useAvaliableData from '../../hooks/useAvailableData';
import {ExercisesProps} from './types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {exerciseListItem} from './styles';
import {StyleProp, ViewStyle} from 'react-native';
import {FlashList} from '@shopify/flash-list';

function Exercises({navigation}: ExercisesProps) {
  const [renderedExercises, setRenderedExercises] = useState<WorkoutList>();
  const {getSavedDefaults} = useAvaliableData();

  useEffect(() => {
    getSavedDefaults((data: DefaultsDefinition) => {
      setRenderedExercises(data.workoutList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack flex={1} justifyContent="space-between">
      <Box />
      {renderedExercises && renderedExercises.length > 0 && (
        <FlashList
          estimatedItemSize={100}
          data={renderedExercises}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Exercise Details', {
                  selectedExercise: item,
                })
              }>
              <Box
                style={exerciseListItem as StyleProp<ViewStyle>}
                safeAreaX
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
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <BottomTabBar navigation={navigation} active="Exercises" />
    </VStack>
  );
}

export default Exercises;
