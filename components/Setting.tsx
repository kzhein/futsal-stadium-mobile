import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';

interface Props {
  title: string;
  description: string;
  icon: {
    name: string;
    size: number;
    color: string;
  };
  onPress(): void;
}

const Setting: React.FC<Props> = ({
  title = 'Settings',
  description = 'This is settings description',
  icon = {
    name: 'ticket-account',
    size: 40,
    color: 'black',
  },
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={0.6}
      underlayColor='#DDDDDD'
      onPress={onPress}
    >
      <View style={styles.wrapper}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon.name}
          size={icon.size}
          color={icon.color}
        />
        <View>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.description}>{description}</AppText>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    marginVertical: 5,
    padding: 13,
    width: '100%',
  },
  description: {
    color: 'grey',
    fontSize: 14,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
  },
});

export default Setting;
