import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import AppText from './AppText';

interface Props {
  date: string;
  time: string;
  status: string;
}

const UserBooking: React.FC<Props> = ({ date, time, status }) => {
  return (
    <View style={styles.container}>
      <AppText>{`${moment(date).format('YYYY-MM-DD')} / ${time}`}</AppText>
      <AppText style={{ color: status === 'pending' ? '#f39c12' : 'green' }}>
        {status}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    paddingVertical: 15,
  },
});

export default UserBooking;
