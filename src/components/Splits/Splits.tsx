import {Center, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import useAvaliableData from '../../hooks/useAvailableData';
import {SplitGroup} from '../../services/types';
import BottomTabBar from '../Navigation/BottomTabBar';

function Split() {
  const [renderedData, setRenderedData] = useState<SplitGroup>();
  const [dataToBeChanged, setDataToBeChanged] = useState<boolean>(false);
  const {savedData} = useAvaliableData();

  useEffect(() => {
    if (savedData) {
      setDataToBeChanged(!dataToBeChanged);
      setRenderedData(savedData.generatedSplits);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData]);

  return (
    <VStack flex={1} justifyContent="space-between">
      <Center>
        <Text mt={5} mb={5} fontSize="lg" fontWeight={700}>
          {!renderedData || renderedData.length === 0
            ? 'Create a Split to see it here!'
            : 'Splits'}
        </Text>
      </Center>
      <BottomTabBar active="Splits" />
    </VStack>
  );
}

export default Split;
