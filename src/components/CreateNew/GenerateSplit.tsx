import {Box, Slider, Text} from 'native-base';
import React, {useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';

function GenerateSplit() {
  const [onChangeEndValue, setOnChangeEndValue] = useState<number>(0);
  return (
    <Box>
      <Text>Generate Split</Text>
      <Box alignItems="center" w="100%">
        <Text textAlign="center">{onChangeEndValue} Excersies</Text>
        <Slider
          minValue={5}
          maxValue={15}
          colorScheme="indigo"
          onChangeEnd={v => {
            v && setOnChangeEndValue(Math.floor(v));
          }}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Box>
    </Box>
  );
}

export default GenerateSplit;
