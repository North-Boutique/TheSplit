import {Box, Text, VStack} from 'native-base';
import React from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';

function Excercises() {
  return (
    <VStack flex={1} justifyContent="space-between">
      <Text>Exercises Screen</Text>
      <BottomTabBar active="Exercises" />
    </VStack>
  );
}

export default Excercises;
