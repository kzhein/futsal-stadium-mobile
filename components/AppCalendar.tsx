import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

interface Props {
  currentDate: string;
  minDate: Date;
  onDayPress(date: string): void;
}

const AppCalendar: React.FC<Props> = ({ currentDate, minDate, onDayPress }) => {
  return (
    <>
      <Calendar
        enableSwipeMonths={true}
        markedDates={{
          [currentDate]: {
            selected: true,
            selectedColor: '#2C3E50',
          },
        }}
        minDate={minDate}
        onDayPress={day =>
          onDayPress(moment(day.dateString).format('YYYY-MM-DD'))
        }
        theme={{
          arrowColor: '#2C3E50',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default AppCalendar;
