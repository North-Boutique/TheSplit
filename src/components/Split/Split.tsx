import {Box, Text, View, VStack} from 'native-base';
import React from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';

function Split() {
  return (
    <VStack flex={1} justifyContent="space-between">
      <Text>Splits Screen</Text>
      <BottomTabBar active="Splits" />
    </VStack>
  );
}

export default Split;
