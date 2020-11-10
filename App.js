// MAPD 712 Milestone 2
// Group #9
// Vitalii Pielevin - student number: 300885108
// Andriichuk Dmytro - student number: 301132978
// October 17, 2020

import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './app/components/SignIn'
import ViewPatients from './app/components/ViewPatients'
import ViewPatient from './app/components/ViewPatient'
import AddPatient from './app/components/AddPatient'
import ViewVitals from './app/components/ViewVitals'
import SignUp from './app/components/SignUp'
import AddVitals from './app/components/AddVitals'

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications



export default App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: 'Welcome' }}
          />

           <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: 'Sign Up' }}
          />

          <Stack.Screen name="ViewPatients" component={ViewPatients} />

          <Stack.Screen
            name="ViewPatient"
            component={ViewPatient}
            options={({ route }) => ({ title: route.params.patient.name })}
          />

           <Stack.Screen
            name="ViewVitals"
            component={ViewVitals}
            options={({ route }) => ({ title: "Vitals " + route.params.patient.name })}
          />

           <Stack.Screen
            name="AddVitals"
            component={AddVitals}
            options={({ route }) => ({ title: "Vitals " + route.params.patient.name })}
          />

          <Stack.Screen
            name="AddPatient"
            component={AddPatient}
            options={({ route }) => ({ title: route.params.patient.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};
