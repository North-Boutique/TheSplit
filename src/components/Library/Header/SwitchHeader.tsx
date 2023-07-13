import {useNavigation} from '@react-navigation/native';
import {Center, Text, Button} from 'native-base';
import React from 'react';
import {SwitchHeaderProps} from './types';

function SwitchHeader({renderedData, type}: SwitchHeaderProps) {
  const navigator = useNavigation();
  return (
    <Center>
      <Text mt={5} mb={5} fontSize="lg" fontWeight={700}>
        {renderedData && renderedData.length > 0
          ? `${type}s`
          : `Create a ${type} to see it here!`}
      </Text>
      {renderedData && renderedData.length > 0 ? (
        <></>
      ) : (
        <Button
          mx={15}
          w={'70%'}
          onPress={() =>
            // @ts-ignore
            navigator.navigate('Create New', {
              genType: type,
            })
          }>
          Let's Go!
        </Button>
      )}
    </Center>
  );
}

export default SwitchHeader;
