import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splits from './src/components/Splits/Splits';
import CreateNew from './src/components/CreateNew/CreateNew';
import Exercises from './src/components/Exercises/Exercises';
import Landing from './src/components/Landing/Landing';
import WorkoutDetails from './src/components/Landing/WorkoutDetails';
import DEFAULTS from './src/db/DEFAULTS.json';
import {firstLaunch, seedUserData} from './src/services/Storage';
import ShowExerciseDetails from './src/components/Exercises/ShowExerciseDetails';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from './navigationTypes';
import {MuscleGroups, WorkoutList} from './src/services/types';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import useAvaliableData from './src/hooks/useAvailableData';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const {} = useAvaliableData();
  useEffect(() => {
    firstLaunch().then((first: boolean) => {
      if (first) {
        seedUserData({
          muscleGroups: DEFAULTS.defaultData.muscleGroups as MuscleGroups,
          workoutList: DEFAULTS.defaultData.workoutList as WorkoutList,
        });
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider>
        <FlipperAsyncStorage />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Landing} />
            <Stack.Screen name="Splits" component={Splits} />
            <Stack.Screen name="Create New" component={CreateNew} />
            <Stack.Screen name="Exercises" component={Exercises} />
            <Stack.Screen
              name="Exercise Details"
              component={ShowExerciseDetails}
            />
            <Stack.Screen name="Workout Details" component={WorkoutDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};
export default App;
