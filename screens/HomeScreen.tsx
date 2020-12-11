import React, { useEffect } from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import AppCalendar from '../components/AppCalendar';
import AvailableHours from '../components/AvailableHours';
import Fab from '../components/Fab';
import Screen from '../components/Screen';
import {
  setDate,
  getAvailableHours,
  toggleSelectedHour,
} from '../actions/availableHourActions';
import {
  createNewBooking,
  resetBookingStatus,
} from '../actions/bookingActions';
import hasNotPassedTheCurrentTime from '../utils/hasNotPassedTheCurrentTime';
import AppText from '../components/AppText';
import { RootStore } from '../store';
import { AvailableHour } from '../types/availableHour/availableHour';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading: loadingAvailableHours, availableHours, date } = useSelector(
    (state: RootStore) => state.availableHourDetails
  );
  const { isAuthenticated } = useSelector((state: RootStore) => state.userAuth);
  const {
    loading: loadingNewBooking,
    success: successNewBooking,
  } = useSelector((state: RootStore) => state.newBooking);
  const showFab = availableHours.some(ava => ava.selected === true);
  const availableHoursRemaining = availableHours.filter(ava =>
    hasNotPassedTheCurrentTime(date!, ava.start)
  );

  useEffect(() => {
    setCurrentDate(moment().format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    if (date) {
      fetchAvailableHours();
    }
  }, [date, dispatch]);

  useEffect(() => {
    if (successNewBooking) {
      fetchAvailableHours();
    }
  }, [successNewBooking]);

  const setCurrentDate = (date: string) => {
    dispatch(setDate(date));
  };

  const fetchAvailableHours = () => {
    dispatch(getAvailableHours(date!));
  };

  const onSingleAvaPress = (avaHour: AvailableHour) => {
    if (!avaHour.booked) {
      dispatch(toggleSelectedHour(avaHour._id));
    }
  };

  const createBooking = () => {
    if (isAuthenticated) {
      if (!loadingNewBooking) {
        const hoursToOrder = availableHoursRemaining
          .filter(ava => ava.selected)
          .map(ava => ava._id);
        dispatch(createNewBooking(hoursToOrder));
      }
    } else {
      Toast.show({
        type: 'info',
        text1: (<AppText style={{ fontSize: 16 }}>Log In</AppText>) as any,
        text2: (
          <AppText style={{ fontSize: 14 }}>
            Please log in to create booking
          </AppText>
        ) as any,
      });
    }
  };

  return (
    <Screen>
      <AppCalendar
        currentDate={date!}
        minDate={new Date()}
        onDayPress={date => setCurrentDate(date)}
      />
      <AvailableHours
        availableHours={availableHoursRemaining}
        fetchAvailableHours={fetchAvailableHours}
        loading={loadingAvailableHours}
        onSingleAvaPress={onSingleAvaPress}
      />
      <Fab
        visible={showFab}
        onPress={createBooking}
        showLoading={loadingNewBooking}
      />
    </Screen>
  );
};

export default HomeScreen;
