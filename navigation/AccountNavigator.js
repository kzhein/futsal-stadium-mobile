import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import UserBookingsScreen from '../screens/UserBookingsScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import PasswordChangeScreen from '../screens/PasswordChangeScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Account'
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name='UserBookings'
      component={UserBookingsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name='PersonalInformation'
      component={PersonalInfoScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name='PasswordChange'
      component={PasswordChangeScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
