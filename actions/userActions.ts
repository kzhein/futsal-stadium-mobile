import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  CLEAR_AUTH_SUCCESS,
  CLEAR_AUTH_ERROR,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from '../constants/userConstants';
import { AppThunk } from '../types/utils';
import {
  User,
  UserLoginData,
  UserPasswordUpdateData,
  UserSignupData,
  UserUpdateData,
} from '../types/user/user';
import { UserDispatchTypes } from '../types/user/userActionTypes';

const url = 'https://kzh-futsal-stadium.herokuapp.com';

export const login = (
  values: UserLoginData
): AppThunk<UserDispatchTypes> => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    interface response {
      token: string;
      data: {
        user: User;
      };
    }

    const {
      data: {
        token,
        data: { user },
      },
    }: AxiosResponse<response> = await axios.post(
      `${url}/api/v1/users/login`,
      values,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { token, user },
    });

    saveAuthToStorage(token, user);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup = (
  values: UserSignupData
): AppThunk<UserDispatchTypes> => async dispatch => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    interface response {
      token: string;
      data: {
        user: User;
      };
    }

    const {
      data: {
        token,
        data: { user },
      },
    }: AxiosResponse<response> = await axios.post(
      `${url}/api/v1/users/signup`,
      values,
      config
    );

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: { token, user },
    });

    saveAuthToStorage(token, user);
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = (): AppThunk<UserDispatchTypes> => async (
  dispatch,
  getState
) => {
  try {
    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const pushToken = await AsyncStorage.getItem('PushToken');

    await axios.patch(`${url}/api/v1/users/logout`, { pushToken }, config);

    await AsyncStorage.removeItem('PushToken');
    await AsyncStorage.removeItem('AuthData');
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const loadUser = (): AppThunk<UserDispatchTypes> => async dispatch => {
  try {
    const rawData = await AsyncStorage.getItem('AuthData');
    if (rawData) {
      const data = JSON.parse(rawData);
      dispatch({ type: USER_LOAD_SUCCESS });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL });
  }
};

export const updateUserDetails = (
  details: UserUpdateData
): AppThunk<UserDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_UPDATE_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      data: {
        user: User;
      };
    }

    const {
      data: {
        data: { user },
      },
    }: AxiosResponse<response> = await axios.patch(
      `${url}/api/v1/users/updateMe`,
      details,
      config
    );

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: { user, success: 'User updated successfully' },
    });
    dispatch({ type: CLEAR_AUTH_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
};

export const updateUserPassword = (
  values: UserPasswordUpdateData
): AppThunk<UserDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      token: string;
      data: {
        user: User;
      };
    }

    const {
      data: {
        token: newToken,
        data: { user },
      },
    }: AxiosResponse<response> = await axios.patch(
      `${url}/api/v1/users/updateMyPassword`,
      values,
      config
    );

    dispatch({
      type: USER_PASSWORD_UPDATE_SUCCESS,
      payload: {
        token: newToken,
        user,
        success: 'User password updated successfully',
      },
    });
    dispatch({ type: CLEAR_AUTH_SUCCESS });

    saveAuthToStorage(newToken, user);
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
};

const saveAuthToStorage = async (token: string, user: User) => {
  try {
    await AsyncStorage.setItem('AuthData', JSON.stringify({ token, user }));
  } catch (error) {
    console.log(error);
  }
};
