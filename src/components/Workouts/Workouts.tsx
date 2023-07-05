import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';
import {Workout} from '../../services/types';
import useAvaliableData from '../../hooks/useAvailableData';

function Workouts() {
  const [renderedData, setRenderedData] = useState<Workout[]>();
  const [dataToBeChanged, setDataToBeChanged] = useState<boolean>(false);
  const {savedData} = useAvaliableData();

  useEffect(() => {
    if (savedData) {
      console.log(savedData.generatedSplits);
      setDataToBeChanged(!dataToBeChanged);
      setRenderedData(Object.values(savedData.defaultData.workoutList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData]);
  return (
    <VStack flex={1} justifyContent="space-between">
      <Text>Workouts Screen</Text>

      <FlatList
        data={renderedData}
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
            <HStack space={[2, 3]} justifyContent="space-between">
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
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <BottomTabBar active="Workouts" />
    </VStack>
  );
}

export default Workouts;
