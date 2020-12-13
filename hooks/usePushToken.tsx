import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { RootStore } from '../store';

const usePushToken = () => {
  const { isAuthenticated, token } = useSelector(
    (state: RootStore) => state.userAuth
  );

  const saveToken = async (pushToken: string) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        'https://kzh-futsal-stadium.herokuapp.com/api/v1/users/addPushToken',
        {
          pushToken,
        },
        config
      );
      console.log('token saved to server');
      await AsyncStorage.setItem('PushToken', pushToken);
      console.log('token saved to storage');
    } catch (error) {
      console.log(error);
    }
  };

  const requestToken = async () => {
    try {
      // Ask notifications permission for iOS
      const hasPermission = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      if (hasPermission.status !== 'granted') {
        const grantPermission = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (grantPermission.status !== 'granted') {
          throw new Error('Permission not granted!');
        }
      }

      console.log('Getting token');
      const response = await Notifications.getExpoPushTokenAsync();
      const token = response.data;
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const token = await requestToken();
        console.log(`Token is  ${token}`);
        if (token) {
          saveToken(token);
        }
      })();
    }
  }, [isAuthenticated]);
};

export default usePushToken;
