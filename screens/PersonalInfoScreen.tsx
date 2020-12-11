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
import { updateUserDetails } from '../actions/userActions';
import { RootStore } from '../store';
import { UserUpdateData } from '../types/user/user';

const PersonalInfoScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state: RootStore) => state.userAuth);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (values: UserUpdateData) =>
    dispatch(updateUserDetails(values));

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <AppText style={styles.title}>Your Account</AppText>

          <View style={styles.formGroup}>
            <AppText style={styles.label}>Name</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={(value: string) => onChange(value)}
                  value={value}
                />
              )}
              name='name'
              rules={{
                required: 'Name is required',
              }}
              defaultValue={user!.name}
            />
            {errors.name && (
              <AppText style={styles.error}>{errors.name.message}</AppText>
            )}
          </View>
          <View style={styles.formGroup}>
            <AppText style={styles.label}>Phone</AppText>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <AppTextInput
                  keyboardType='number-pad'
                  onBlur={onBlur}
                  onChangeText={(value: string) => onChange(value)}
                  value={value}
                />
              )}
              name='phone'
              rules={{
                required: 'Phone is required',
              }}
              defaultValue={user!.phone}
            />
            {errors.phone && (
              <AppText style={styles.error}>{errors.phone.message}</AppText>
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

export default PersonalInfoScreen;
