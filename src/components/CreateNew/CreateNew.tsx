import {Box, CheckIcon, Select, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import BottomTabBar from '../Navigation/BottomTabBar';
import {GeneratorTypes} from './types';
import GenerateSplit from './GenerateSplit';
import GenerateWorkout from './GenerateWorkout';

function CreateNew() {
  const [generatorType, setGeneratorType] = useState<GeneratorTypes>('None');
  return (
    <Box height={'100%'} width={'100%'} safeArea safeAreaBottom>
      <VStack flex={1}>
        <Text textAlign={'center'}>
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
            <Select.Item label="New Split" value="Split" />
            <Select.Item label="New Workout" value="Workout" />
          </Select>
        </Box>
        <Box width={'100%'} safeAreaX={5} safeAreaTop={5}>
          {generatorType === 'Split' && <GenerateSplit />}
          {generatorType === 'Workout' && <GenerateWorkout />}
        </Box>
      </VStack>
      <Box width={'100%'} position={'absolute'} bottom={0}>
        <BottomTabBar active="CreateNew" />
      </Box>
    </Box>
  );
}

export default CreateNew;
