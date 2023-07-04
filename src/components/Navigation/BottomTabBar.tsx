import * as React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Split from '../Split/Split';
import Excercises from '../Excercises/Excercises';
import CreateNew from '../CreateNew/CreateNew';
import Landing from '../Landing/Landing';
import {HStack, VStack, IconButton, Icon, Text} from 'native-base';

type BottomTabBarProps = {
  active: 'Home' | 'Splits' | 'CreateNew' | 'Exercises';
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({active}) => {
  const navigation = useNavigation();

  return (
    <HStack
      bg="primary.500"
      alignItems="center"
      justifyContent="space-around"
      safeAreaBottom
    >
      <VStack space={2} alignItems="center">
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
          ></IconButton>
          <Text textAlign={'center'} color="white" fontSize="md" mt={-3}>
            Home
          </Text>
        </TouchableOpacity>
      </VStack>
      <VStack space={2} alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('Split')}>
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
            Split
          </Text>
        </TouchableOpacity>
      </VStack>
      <VStack space={2} alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('CreateNew')}>
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
            onPress={() => navigation.navigate('CreateNew')}
          />
          <Text textAlign={'center'} color="white" fontSize="md" mt={-3}>
            Create New
          </Text>
        </TouchableOpacity>
      </VStack>
      <VStack space={2} alignItems="center">
        <TouchableOpacity onPress={() => navigation.navigate('Excercises')}>
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
            onPress={() => navigation.navigate('Excercises')}
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
