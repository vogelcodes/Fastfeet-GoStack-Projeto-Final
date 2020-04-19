// In App.js in a new project
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
