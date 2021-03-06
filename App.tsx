import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import AppNavigator from './navigation/AppNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    lato: require('./assets/fonts/Lato-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
  });
};

const App: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
