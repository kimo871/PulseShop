import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated} = useSelector((state)=> state?.auth); // just dummy flag for testing purposes
  console.log("state",isAuthenticated)

  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
