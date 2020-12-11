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
  CLEAR_AUTH_ERROR,
  CLEAR_AUTH_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from '../constants/userConstants';
import { UserAuthState, UserLoadState } from '../types/user/user';
import { UserDispatchTypes } from '../types/user/userActionTypes';

export const userAuthReducer = (
  state: UserAuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    user: null,
    success: null,
    error: null,
  },
  action: UserDispatchTypes
): UserAuthState => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
        success: null,
        error: null,
      };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return {
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        success: action.payload.success,
        error: null,
      };
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        success: null,
        error: null,
      };
    case USER_SIGNUP_FAIL:
    case USER_LOGIN_FAIL:
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        success: null,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        success: null,
        error: null,
      };
    case USER_PASSWORD_UPDATE_REQUEST:
    case USER_DETAILS_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        success: action.payload.success,
      };
    case USER_PASSWORD_UPDATE_FAIL:
    case USER_DETAILS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_AUTH_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export const userLoadReducer = (
  state: UserLoadState = {
    loading: true,
    success: null,
    error: null,
  },
  action: UserDispatchTypes
): UserLoadState => {
  switch (action.type) {
    case USER_LOAD_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      };
    case USER_LOAD_FAIL:
      return {
        loading: false,
        success: null,
        error: true,
      };
    default:
      return state;
  }
};
