import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile: React.FC = () => {
  return (
    <MaterialCommunityIcons name='account-circle' size={120} color='#2C3E50' />
  );
};

const styles = StyleSheet.create({});

export default Profile;
