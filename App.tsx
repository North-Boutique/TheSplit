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

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    getData().then(data => {
      if (data.defaultData.muscleGroups.length === 0) {
        const userdata: any = {
          ...DEFAULTS,
        };
        seedUserData(userdata);
      }
    });
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Landing} />
          <Stack.Screen name="Splits" component={Splits} />
          <Stack.Screen name="CreateNew" component={CreateNew} />
          <Stack.Screen name="Workouts" component={Workouts} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
