import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AppText from '../components/AppText';
import Profile from '../components/Profile';
import Screen from '../components/Screen';
import Setting from '../components/Setting';
import { logout } from '../actions/userActions';

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Screen style={styles.container}>
      <Profile />
      <AppText style={styles.name}>Kyaw Zin Hein</AppText>

      <Setting
        title='Your Bookings'
        description='See all of your bookings'
        icon={{
          name: 'ticket-account',
          size: 40,
          color: '#2C3E50',
        }}
        onPress={() => navigation.navigate('UserBookings')}
      />
      <Setting
        title='Personal Information'
        description='Your name, phone'
        icon={{
          name: 'book-open',
          size: 40,
          color: '#2C3E50',
        }}
        onPress={() => navigation.navigate('PersonalInformation')}
      />
      <Setting
        title='Change your password'
        description='Your account password'
        icon={{
          name: 'lock',
          size: 40,
          color: '#2C3E50',
        }}
        onPress={() => navigation.navigate('PasswordChange')}
      />
      <Setting
        title='Log out'
        description='Log out of your account'
        icon={{
          name: 'exit-run',
          size: 40,
          color: '#2C3E50',
        }}
        onPress={() => dispatch(logout())}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  name: {
    fontSize: 25,
    marginBottom: 5,
  },
});

export default AccountScreen;
