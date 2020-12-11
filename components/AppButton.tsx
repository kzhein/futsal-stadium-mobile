import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppText from './AppText';

interface Props {
  title: string;
  onPress(): void;
  loading?: boolean;
  normalButtonColor?: string;
  loadingButtonColor?: string;
}

const AppButton: React.FC<Props> = ({
  title,
  onPress,
  loading = false,
  normalButtonColor = '#2C3E50',
  loadingButtonColor = '#95A5A6',
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!loading) {
          onPress();
        }
      }}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: loading ? loadingButtonColor : normalButtonColor,
        }}
      >
        <AppText style={styles.text}>{loading ? 'Loading...' : title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default AppButton;
