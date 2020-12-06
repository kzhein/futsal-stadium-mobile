import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { animated, useSpring } from 'react-spring';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedTouchableHighlight = animated(TouchableHighlight);

const Fab = ({ visible, onPress, showLoading }) => {
  const animation = useSpring({
    opacity: visible ? 1 : 0,
    height: visible ? 70 : 0,
    width: visible ? 70 : 0,
    translateY: visible ? 0 : 100,
  });

  return (
    <AnimatedTouchableHighlight
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, animation]}
      underlayColor='#3879a5'
    >
      {showLoading ? (
        <ActivityIndicator size={'large'} color='black' />
      ) : (
        <MaterialCommunityIcons name='check-bold' size={35} color='black' />
      )}
    </AnimatedTouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#3598DB',
    borderRadius: 35,
    bottom: 10,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 70,
  },
});

export default Fab;
