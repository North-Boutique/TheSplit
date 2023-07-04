import React, {useEffect, useState} from 'react';
import {Box, Text, VStack, View} from 'native-base';
import BottomTabBar from '../Navigation/BottomTabBar';
import {getData} from '../../services/Storage';

function Landing() {
  const [muscleGroups, setMuscleGroups] = useState<any>();
  useEffect(() => {
    retrieveStoredMuscleGroups();
  }, []);

  const retrieveStoredMuscleGroups = async () => {
    const muscleGroups = await getData('MuscleGroups');
    setMuscleGroups(muscleGroups);
  };

  return (
    <VStack flex={1} justifyContent="space-between">
      <Text>Home Screen</Text>
      <BottomTabBar active="Home" />
    </VStack>
  );
}

export default Landing;
