import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  style?: {};
  [x: string]: any;
}

const AppTextInput: React.FC<Props> = ({ style, ...props }) => {
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
