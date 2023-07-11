import React, {useEffect, useState} from 'react';
import {Box, FlatList, HStack, Text, VStack} from 'native-base';
import BottomTabBar from '../Navigation/BottomTabBar';
import useAvaliableData from '../../hooks/useAvailableData';
import {SplitGroup} from '../../services/types';

function Landing() {
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
      <Text>Home Screen</Text>
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
                  {item.createdAt}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <BottomTabBar active="Home" />
    </VStack>
  );
}

export default Landing;
