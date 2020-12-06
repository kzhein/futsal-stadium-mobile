import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import { login } from '../actions/userActions';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.userAuth);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = values => dispatch(login(values));

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <AppText style={styles.title}>Log in</AppText>

          <View style={styles.formGroup}>
            <AppText style={styles.label}>Email</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  keyboardType='email-address'
                  value={value}
                />
              )}
              name='email'
              rules={{
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              defaultValue=''
            />
            {errors.email && (
              <AppText style={styles.error}>{errors.email.message}</AppText>
            )}
          </View>
          <View style={styles.formGroup}>
            <AppText style={styles.label}>Password</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name='password'
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              }}
              defaultValue=''
            />
            {errors.password && (
              <AppText style={styles.error}>{errors.password.message}</AppText>
            )}
          </View>
          <AppText style={styles.forgot}>Forgot Password?</AppText>
          <View style={styles.formGroup}>
            <AppButton
              title='Log in'
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SignUp')}
          >
            <View>
              <AppText style={styles.signup}>Sign up</AppText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  error: {
    color: 'red',
  },
  forgot: {
    alignSelf: 'center',
    marginBottom: 30,
    color: 'grey',
    fontSize: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  signup: {
    alignSelf: 'center',
    fontSize: 18,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
});
export default LoginScreen;
