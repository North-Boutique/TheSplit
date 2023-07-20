import {FlashList} from '@shopify/flash-list';
import {Box, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {ImportantMappings, WorkoutByReference} from '../../services/types';
import {exerciseListItem} from '../Exercises/styles';
import {WorkoutDetailsProps} from './types';

function WorkoutDetails({route, navigation}: WorkoutDetailsProps) {
  const params = route.params;
  const [renderedData, setRenderedData] = useState<WorkoutByReference>();

  useEffect(() => {
    if (params?.selectedWorkout) {
      setRenderedData(params.selectedWorkout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack flex={1} justifyContent="space-between">
      <Box mt={5} mb={2} alignSelf="center">
        {renderedData && (
          <Text fontSize="2xl" fontWeight={700}>
            {renderedData.name}
          </Text>
        )}
      </Box>
      {renderedData && renderedData.workouts.length > 0 && (
        <FlashList
          estimatedItemSize={100}
          data={renderedData.workouts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Exercise Details', {
                  selectedExercise: item,
                })
              }>
              <Box
                style={exerciseListItem as StyleProp<ViewStyle>}
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
          keyExtractor={item => item.name}
        />
      )}
    </VStack>
  );
}

export default WorkoutDetails;
