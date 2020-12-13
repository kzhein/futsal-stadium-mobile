import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import HomeScreen from '../screens/HomeScreen';
import AccountNavigator from './AccountNavigator';
import AuthNavigator from './AuthNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import { loadUser } from '../actions/userActions';
import useToast from '../hooks/useToast';
import { RootStore } from '../store';
import usePushToken from '../hooks/usePushToken';

const Tab = createBottomTabNavigator();

// to show notifications even if the app is in foreground, by default notifications will not be shown if the app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const AppNavigator = () => {
  const { isAuthenticated, success, error, token } = useSelector(
    (state: RootStore) => state.userAuth
  );
  const { success: successNewBooking } = useSelector(
    (state: RootStore) => state.newBooking
  );
  const { loading } = useSelector((state: RootStore) => state.userLoad);

  const dispatch = useDispatch();
  useToast(success, error);
  useToast(successNewBooking, null);
  usePushToken();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2C3E70',
        labelStyle: {
          fontFamily: 'lato',
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      {isAuthenticated ? (
        <Tab.Screen
          name='Account'
          component={AccountNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='account'
                color={color}
                size={size}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name='Login'
          component={AuthNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='login' color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
