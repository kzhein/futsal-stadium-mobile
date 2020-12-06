import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import { signup } from '../actions/userActions';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, errors, getValues } = useForm();

  const { loading } = useSelector(state => state.userAuth);

  const onSubmit = values => dispatch(signup(values));

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView>
            <AppText style={styles.title}>Sign Up</AppText>

            <View style={styles.formGroup}>
              <AppText style={styles.label}>Name</AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <AppTextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='name'
                rules={{
                  required: 'Name is required',
                }}
                defaultValue=''
              />
              {errors.name && (
                <AppText style={styles.error}>{errors.name.message}</AppText>
              )}
            </View>
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
              <AppText style={styles.label}>Phone Number</AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <AppTextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    keyboardType='number-pad'
                    value={value}
                  />
                )}
                name='phone'
                rules={{
                  required: 'Phone is required',
                }}
                defaultValue=''
              />
              {errors.phone && (
                <AppText style={styles.error}>{errors.phone.message}</AppText>
              )}
            </View>
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Password</AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <AppTextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    secureTextEntry={true}
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
                <AppText style={styles.error}>
                  {errors.password.message}
                </AppText>
              )}
            </View>
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Password Confirm</AppText>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <AppTextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    secureTextEntry={true}
                    value={value}
                  />
                )}
                name='passwordConfirm'
                rules={{
                  validate: {
                    passwordsMatch: value =>
                      value === getValues('password') ||
                      'Passwords do not match',
                  },
                }}
                defaultValue=''
              />
              {errors.passwordConfirm && (
                <AppText style={styles.error}>
                  {errors.passwordConfirm.message}
                </AppText>
              )}
            </View>
            <View style={styles.formGroup}>
              <AppButton
                loading={loading}
                title='Sign up'
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
});
export default SignUpScreen;
