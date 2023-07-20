import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {FilterButtonProps, FilterComponentProps} from './types';

const FilterButton = ({
  title,
  selectedBackground,
  onTap,
  isDisabled,
}: FilterButtonProps) => {
  const [selected, setSelected] = useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(selected ? selectedBackground : 'white', {
        duration: 200,
      }),
    };
  });

  const onPress = () => {
    if (!isDisabled(title)) {
      setSelected(!selected);
      onTap(title);
    }
  };

  return (
    <Animated.View style={[styles.button, animatedStyles]}>
      <TouchableOpacity disabled={isDisabled(title)} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FilterGroup = ({
  options,
  selectedBackground,
  onTap,
  isDisabled,
}: FilterComponentProps) => {
  return (
    <>
      {options.map((option, index) => (
        <FilterButton
          selectedBackground={selectedBackground}
          key={index}
          title={option}
          onTap={onTap}
          isDisabled={isDisabled}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    borderColor: 'gray',
  },
});

export default FilterGroup;
