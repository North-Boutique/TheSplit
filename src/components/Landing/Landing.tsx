import React, {useEffect, useState} from 'react';
import {Box, Center, FlatList, HStack, Text, VStack} from 'native-base';
import BottomTabBar from '../Navigation/BottomTabBar';
import useAvaliableData from '../../hooks/useAvailableData';
import {WorkoutByReference} from '../../services/types';
import {useNavigation} from '@react-navigation/native';
import {TouchableHighlight} from 'react-native';

// @ts-ignore
function Landing({route}) {
  const navigator = useNavigation();
  const params = route?.params;
  const [renderedData, setRenderedData] = useState<WorkoutByReference[]>();
  const [dataToBeChanged, setDataToBeChanged] = useState<boolean>(false);
  const {savedData, setSaved} = useAvaliableData();

  useEffect(() => {
    if (
      params?.recentlyCreated &&
      savedData.defaultData.muscleGroups.length > 0
    ) {
      setSaved();
    }
  }, [navigator, setSaved, params, savedData.defaultData.muscleGroups.length]);

  useEffect(() => {
    console.log(savedData);
    if (savedData.defaultData.muscleGroups.length === 0) {
      setSaved();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (savedData.defaultData.muscleGroups.length > 0) {
      setDataToBeChanged(!dataToBeChanged);
      setRenderedData(savedData.generatedWorkouts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData]);

  return (
    <VStack flex={1} justifyContent="space-between">
      <Center>
        <Text mt={5} mb={5} fontWeight={700}>
          {!renderedData ? 'Create a workout to see it here!' : 'Workouts'}
        </Text>
      </Center>
      {renderedData && renderedData.length > 0 && (
        <FlatList
          data={renderedData}
          renderItem={({item}) => (
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() =>
                // @ts-ignore
                navigator.navigate('Workout Details', {selectedWorkout: item})
              }>
              <Box
                borderBottomWidth="1"
                borderWidth="1"
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="blueGray.500"
                borderRadius="lg"
                mx={3}
                mb={2}
                p={2}>
                <HStack pb={1} justifyContent="space-between">
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
                      Exercises {item.workouts.length}
                    </Text>
                  </VStack>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    Created {item.createdAt}
                  </Text>
                </HStack>
              </Box>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.name}
        />
      )}

      <BottomTabBar active="Home" />
    </VStack>
  );
}

export default Landing;
