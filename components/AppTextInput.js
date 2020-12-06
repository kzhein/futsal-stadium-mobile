import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const AppTextInput = ({ style, ...props }) => {
  return <TextInput style={{ ...styles.textinput, ...style }} {...props} />;
};

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default AppTextInput;
