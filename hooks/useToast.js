import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import AppText from '../components/AppText';

const useToast = (success, error) => {
  useEffect(() => {
    if (success) {
      Toast.show({
        text1: <AppText style={styles.title}>Success</AppText>,
        text2: <AppText style={styles.text}>{success}</AppText>,
      });
    }
    if (error) {
      Toast.show({
        type: 'error',
        text1: <AppText style={styles.title}>Error</AppText>,
        text2: <AppText style={styles.text}>{error}</AppText>,
      });
    }
  }, [success, error]);

  return;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 14,
  },
});

export default useToast;
