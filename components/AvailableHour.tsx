import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { animated, useSpring } from 'react-spring';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';

const AnimatedView: any = animated(View);

interface Props {
  time: string;
  isSelected: boolean;
  isBooked: boolean;
  onPress(): void;
}

const AvailableHour: React.FC<Props> = ({
  time,
  isBooked,
  isSelected,
  onPress,
}) => {
  const animation = useSpring({
    opacity: isSelected ? 1 : 0,
    translateX: isSelected ? 0 : 24,
    width: isSelected ? 24 : 0,
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.availableHour,
            backgroundColor: isBooked
              ? '#E74C3C'
              : isSelected
              ? '#95A5A6'
              : '#2C3E50',
          }}
        >
          <AppText style={styles.text}>{isBooked ? 'Booked' : time}</AppText>
          <AnimatedView style={animation}>
            <MaterialCommunityIcons name='check' size={24} color='white' />
          </AnimatedView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  availableHour: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    height: 70,
    width: '50%',
    padding: 5,
  },
  text: {
    color: 'white',
    marginRight: 4,
  },
});

export default AvailableHour;
