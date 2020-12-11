import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Screen from '../components/Screen';
import UserBooking from '../components/UserBooking';
import { getUserBookings } from '../actions/bookingActions';
import AppText from '../components/AppText';
import hasNotPassedTheCurrentTime from '../utils/hasNotPassedTheCurrentTime';
import { RootStore } from '../store';

const UserBookingsScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, bookings } = useSelector(
    (state: RootStore) => state.userBookings
  );
  const bookingsRemaining = bookings.filter(bk =>
    hasNotPassedTheCurrentTime(bk.date, bk.time.start)
  );

  useEffect(() => {
    fetchNewData();
  }, []);

  const fetchNewData = () => {
    dispatch(getUserBookings());
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>Your Bookings</AppText>

      {!loading && bookingsRemaining.length === 0 && (
        <AppText style={styles.noBookings}>You have no bookings</AppText>
      )}

      <FlatList
        data={bookingsRemaining}
        renderItem={({ item }) => (
          <UserBooking
            date={item.date}
            time={item.time.time}
            status={item.status}
          />
        )}
        keyExtractor={item => `${item._id}`}
        onRefresh={fetchNewData}
        refreshing={loading}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  noBookings: {
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginBottom: 5,
  },
});

export default UserBookingsScreen;
