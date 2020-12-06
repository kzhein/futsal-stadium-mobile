import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import AppText from './AppText';
import AvailableHour from './AvailableHour';

const AvailableHours = ({
  availableHours,
  fetchAvailableHours,
  loading,
  onSingleAvaPress,
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchAvailableHours} />
      }
    >
      <AppText style={styles.title}>Pick the sections</AppText>
      <View style={styles.availableHours}>
        {availableHours.map(avaHour => (
          <AvailableHour
            key={avaHour._id}
            time={avaHour.time}
            isSelected={avaHour.selected}
            isBooked={avaHour.booked}
            onPress={() => onSingleAvaPress(avaHour)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  availableHours: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
  },
});

export default AvailableHours;
