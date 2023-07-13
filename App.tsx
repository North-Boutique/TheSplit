import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splits from './src/components/Splits/Splits';
import CreateNew from './src/components/CreateNew/CreateNew';
import Workouts from './src/components/Workouts/Workouts';
import Landing from './src/components/Landing/Landing';
import DEFAULTS from './src/db/DEFAULTS.json';
import {getData, seedUserData} from './src/services/Storage';
import ShowWorkoutDetails from './src/components/Workouts/ShowWorkoutDetails';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    getData().then(data => {
      if (
        data.defaultData.muscleGroups.length === 0 ||
        data.defaultData.workoutList.length !==
          DEFAULTS.defaultData.workoutList.length
      ) {
        const userdata: any = {
          ...DEFAULTS,
        };
        seedUserData(userdata);
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Landing} />
            <Stack.Screen name="Splits" component={Splits} />
            <Stack.Screen name="Create New" component={CreateNew} />
            <Stack.Screen name="Workouts" component={Workouts} />
            <Stack.Screen
              name="Workout Details"
              component={ShowWorkoutDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};
export default App;
