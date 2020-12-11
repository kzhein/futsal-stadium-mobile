import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import AppText from '../components/AppText';

const useToast = (success: string | null, error: string | null) => {
  useEffect(() => {
    if (success) {
      Toast.show({
        type: 'success',
        text1: (<AppText style={styles.title}>Success</AppText>) as any,
        text2: (<AppText style={styles.text}>{success}</AppText>) as any,
      });
    }
    if (error) {
      Toast.show({
        type: 'error',
        text1: (<AppText style={styles.title}>Error</AppText>) as any,
        text2: (<AppText style={styles.text}>{error}</AppText>) as any,
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
