import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import UserBookingsScreen from '../screens/UserBookingsScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import PasswordChangeScreen from '../screens/PasswordChangeScreen';

export type AccountStackParamList = {
  Account: undefined;
  UserBookings: undefined;
  PersonalInformation: undefined;
  PasswordChange: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

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
