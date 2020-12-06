import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import UserBookingsScreen from '../screens/UserBookingsScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Login'
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name='SignUp'
      component={SignUpScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
