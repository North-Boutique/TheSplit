import React, {useEffect, useRef} from 'react';
import {Box, Center, Text, VStack, Image} from 'native-base';
import northboutiquelogooutline from '../../../assets/icons/north-boutique-logo-outline.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Animated, Easing} from 'react-native';

const UnderConstruction = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateIcon = () => {
      // Reset the animated value
      animatedValue.setValue(0);

      // Start the animation
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start(() => animateIcon());
    };
    animateIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Interpolate rotation and scale
  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  return (
    <VStack flex={1} justifyContent="space-between">
      <Center>
        <Box h="50%" justifyContent="center" alignContent="center">
          <Box flexDirection="row" justifyContent="center" alignItems="center">
            <Text fontFamily="mono" fontSize="3xl" fontWeight={700} mr="3">
              Coming Soon!
            </Text>
            <Box>
              <Image
                height={10}
                width={10}
                source={northboutiquelogooutline}
                alt="North Boutique Logo"
              />
            </Box>
          </Box>
          <Box w="100%" alignSelf="center">
            <Animated.View
              style={{transform: [{rotate: rotation}, {scale: scale}]}}>
              <Ionicons name="ios-construct" size={60} color="black" />
            </Animated.View>
          </Box>
        </Box>
      </Center>
    </VStack>
  );
};

export default UnderConstruction;
