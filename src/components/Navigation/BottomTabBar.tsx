import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {HStack, VStack, IconButton, Icon, Text} from 'native-base';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigationTypes';

type BottomTabBarProps = {
  active: 'Home' | 'Splits' | 'CreateNew' | 'Exercises';
  navigation: NativeStackNavigationProp<RootStackParamList, any, undefined>;
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({active, navigation}) => {
  return (
    <HStack
      bg="#4B9AE7"
      alignItems="center"
      justifyContent="space-around"
      safeAreaBottom={7}
      safeAreaX>
      <VStack
        style={active === 'Home' ? styles.shadowProp : []}
        space={2}
        alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <IconButton
            disabled
            variant="ghost"
            icon={
              <Icon
                as={
                  <Ionicons
                    name={active === 'Home' ? 'home' : 'home-outline'}
                  />
                }
                color="white"
                size={30}
              />
            }
          />
          <Text textAlign={'center'} color="white" fontSize="md" mt={-3}>
            Home
          </Text>
        </TouchableOpacity>
      </VStack>
      <VStack
        style={active === 'Splits' ? styles.shadowProp : []}
        space={2}
        alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('Splits')}>
          <IconButton
            disabled
            variant="ghost"
            icon={
              <Icon
                as={
                  <Ionicons
                    name={
                      active === 'Splits' ? 'barbell-sharp' : 'barbell-outline'
                    }
                  />
                }
                color="white"
                size={30}
              />
            }
          />
          <Text textAlign={'center'} color="white" fontSize="md" mt={-3}>
            Splits
          </Text>
        </TouchableOpacity>
      </VStack>
      <VStack
        style={active === 'CreateNew' ? styles.shadowProp : []}
        space={2}
        alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('Create New')}>
          <IconButton
            disabled
            variant="ghost"
            icon={
              <Icon
                as={
                  <Ionicons
                    name={
                      active === 'CreateNew'
                        ? 'add-circle'
                        : 'add-circle-outline'
                    }
                  />
                }
                color="white"
                size={30}
              />
            }
            onPress={() => navigation.navigate('Create New')}
          />
          <Text textAlign={'center'} color="white" fontSize="md" mt={-3}>
            Create New
          </Text>
        </TouchableOpacity>
      </VStack>
      <VStack
        style={active === 'Exercises' ? styles.shadowProp : []}
        space={2}
        alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
          <IconButton
            disabled
            variant="ghost"
            icon={
              <Icon
                as={
                  <Ionicons
                    name={
                      active === 'Exercises' ? 'body-sharp' : 'body-outline'
                    }
                  />
                }
                color="white"
                size={30}
              />
            }
          />
          <Text textAlign={'center'} color="white" fontSize="md" mt={-3}>
            Exercises
          </Text>
        </TouchableOpacity>
      </VStack>
    </HStack>
  );
};

export default BottomTabBar;

//   let iconName: string = 'alert';
//   if (route.name === 'Home') {
//     iconName = focused ? 'home' : 'home-outline';
//   } else if (route.name === 'Split') {
//     iconName = focused ? 'barbell-sharp' : 'barbell-outline';
//   } else if (route.name === 'CreateNew') {
//     iconName = focused ? 'add-circle' : 'add-circle-outline';
//   } else if (route.name === 'Excercises') {
//     iconName = focused ? 'body-sharp' : 'body-outline';
//   }

//   // You can return any component that you like here!
//   return <Ionicons name={iconName} size={size} color={color} />;
// },
// tabBarActiveTintColor: 'tomato',
// tabBarInactiveTintColor: 'gray',
