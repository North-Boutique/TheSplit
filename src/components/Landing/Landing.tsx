/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import BottomTabBar from '../Navigation/BottomTabBar';
import useAvaliableData from '../../hooks/useAvailableData';
import {WorkoutByReference} from '../../services/types';
import {Animated, TouchableHighlight} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {findIndex} from 'lodash';
import SwitchHeader from '../Library/Header/SwitchHeader';
import {LandingScreenProps} from './types';

function Landing({route, navigation}: LandingScreenProps) {
  const params = route?.params;
  const [renderedData, setRenderedData] = useState<WorkoutByReference[]>();
  const [dataToBeChanged, setDataToBeChanged] = useState<boolean>(false);
  const {savedData, setSaved, deleteWorkout} = useAvaliableData();

  useEffect(() => {
    if (
      params?.recentlyCreated &&
      savedData.defaultData.muscleGroups.length > 0
    ) {
      setSaved();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, params]);

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

  const deleteSavedWorkout = (identifier: string) => {
    if (
      findIndex(
        savedData.generatedWorkouts,
        (el: WorkoutByReference) => el.id === identifier,
      ) > -1
    ) {
      deleteWorkout(identifier).then(() => {
        setSaved();
      });
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>,
    id: string,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });
    return (
      <RectButton
        style={{
          marginLeft: -10,
          width: '25%',
          marginRight: 5,
          backgroundColor: '#fda4af',
          borderLeftWidth: 0,
          borderWidth: 1,
          borderColor: '#64748b',
          borderRadius: 8,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        activeOpacity={0.6}
        underlayColor="#ffe4e6"
        onPress={() => deleteSavedWorkout(id)}>
        <Animated.View
          style={[
            {
              transform: [{translateX: trans}],
            },
          ]}>
          <Box
            h="100%"
            _dark={{
              borderColor: 'muted.50',
            }}
            p={2}
            justifyContent="center"
            alignItems="center">
            <HStack justifyContent="space-between">
              <Box>
                <Text>Delete</Text>
              </Box>
            </HStack>
          </Box>
        </Animated.View>
      </RectButton>
    );
  };

  return (
    <VStack flex={1} justifyContent="space-between">
      <SwitchHeader renderedData={renderedData} type="Workout" />
      {renderedData && renderedData.length > 0 && (
        <FlatList
          data={renderedData}
          renderItem={({item}) => (
            <Swipeable
              overshootRight={false}
              containerStyle={{
                marginHorizontal: 20,
                marginBottom: 4,
              }}
              renderRightActions={(
                progress: Animated.AnimatedInterpolation<string | number>,
                dragX: Animated.AnimatedInterpolation<string | number>,
              ) => renderRightActions(progress, dragX, item.id)}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate('Workout Details', {
                    selectedWorkout: item,
                  })
                }>
                <Box
                  backgroundColor={'#f5f5f5'}
                  borderBottomWidth="1"
                  borderWidth="1"
                  _dark={{
                    borderColor: 'muted.50',
                  }}
                  borderColor="blueGray.500"
                  borderRadius="8"
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
            </Swipeable>
          )}
          keyExtractor={item => item.name}
        />
      )}

      <BottomTabBar navigation={navigation} active="Home" />
    </VStack>
  );
}

export default Landing;
