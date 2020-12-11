import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  style?: object;
}

const AppText: React.FC<Props> = ({ children, style }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'lato',
  },
});

export default AppText;
