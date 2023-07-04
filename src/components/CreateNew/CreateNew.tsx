import {Box, Text, VStack} from 'native-base';
import React from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';

function CreateNew() {
  return (
    <VStack flex={1} justifyContent="space-between">
      <Text>Create New Screen</Text>
      <BottomTabBar active="CreateNew" />
    </VStack>
  );
}

export default CreateNew;
