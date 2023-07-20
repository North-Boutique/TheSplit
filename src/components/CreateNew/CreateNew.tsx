import {Box, CheckIcon, ScrollView, Select, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';
import {CreateNewProps, GeneratorTypes} from './types';
// import GenerateSplit from './GenerateSplit';
import GenerateWorkout from './GenerateWorkout';

function CreateNew({route, navigation}: CreateNewProps) {
  const params = route.params;
  const [generatorType, setGeneratorType] = useState<GeneratorTypes>('None');

  useEffect(() => {
    if (params?.genType) {
      setGeneratorType(params.genType);
    }
  }, [params, route]);

  return (
    <Box height={'100%'} width={'100%'} safeArea safeAreaBottom>
      <ScrollView mb={'10%'} w="100%" m={0} paddingX={5}>
        <VStack flex={1} safeAreaBottom>
          <Text fontSize={20} textAlign={'center'}>
            {generatorType !== 'None'
              ? `Generate New ${generatorType}`
              : 'Choose Generator'}
          </Text>
          <Box safeAreaTop={0} safeAreaX={5}>
            <Select
              selectedValue={generatorType}
              minWidth="200"
              accessibilityLabel="Generator Type"
              placeholder="Generator Type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue: string) =>
                setGeneratorType(itemValue as GeneratorTypes)
              }>
              {/* <Select.Item label="New Split" value="Split" /> */}
              <Select.Item label="New Workout" value="Workout" />
            </Select>
          </Box>
          <Box width={'100%'} safeAreaX={5} safeAreaTop={5}>
            {/* {generatorType === 'Split' && <GenerateSplit />} */}
            {generatorType === 'Workout' && <GenerateWorkout />}
          </Box>
        </VStack>
      </ScrollView>
      <Box safeAreaTop width={'100%'} position={'absolute'} bottom={0}>
        <BottomTabBar navigation={navigation} active="CreateNew" />
      </Box>
    </Box>
  );
}

export default CreateNew;
