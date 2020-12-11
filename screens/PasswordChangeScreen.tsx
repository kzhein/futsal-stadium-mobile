import React from 'react';
import {
  Keyboard,
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
import { updateUserPassword } from '../actions/userActions';
import { RootStore } from '../store';
import { UserPasswordUpdateData } from '../types/user/user';

const PasswordChangeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootStore) => state.userAuth);
  const { control, handleSubmit, errors, getValues } = useForm();

  const onSubmit = (values: UserPasswordUpdateData) =>
    dispatch(updateUserPassword(values));

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <AppText style={styles.title}>Update Password</AppText>

          <View style={styles.formGroup}>
            <AppText style={styles.label}>Current Password</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={(value: string) => onChange(value)}
                  secureTextEntry={true}
                  value={value}
                />
              )}
              name='passwordCurrent'
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              }}
              defaultValue=''
            />
            {errors.passwordCurrent && (
              <AppText style={styles.error}>
                {errors.passwordCurrent.message}
              </AppText>
            )}
          </View>

          <View style={styles.formGroup}>
            <AppText style={styles.label}>New Password</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={(value: string) => onChange(value)}
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
              <AppText style={styles.error}>{errors.password.message}</AppText>
            )}
          </View>

          <View style={styles.formGroup}>
            <AppText style={styles.label}>Confirm New Password</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={(value: string) => onChange(value)}
                  secureTextEntry={true}
                  value={value}
                />
              )}
              name='passwordConfirm'
              rules={{
                validate: {
                  passwordsMatch: value =>
                    value === getValues('password') || 'Passwords do not match',
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
              title='Update'
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>
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

export default PasswordChangeScreen;
