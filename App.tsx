import React from 'react';
import {NativeBaseProvider, Text, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Split from './src/components/Split/Split';
import CreateNew from './src/components/CreateNew/CreateNew';
import Excercises from './src/components/Excercises/Excercises';
import Landing from './src/components/Landing/Landing';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Landing} />
          <Stack.Screen name="Split" component={Split} />
          <Stack.Screen name="CreateNew" component={CreateNew} />
          <Stack.Screen name="Excercises" component={Excercises} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
