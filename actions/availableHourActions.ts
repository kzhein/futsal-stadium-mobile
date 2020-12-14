import axios from 'axios';
import {
  AVAILABLE_HOUR_REQUEST,
  AVAILABLE_HOUR_SUCCESS,
  AVAILABLE_HOUR_FAIL,
  TOGGLE_SELECTED_HOUR,
  SET_AVAILABLE_HOUR_DATE,
} from '../constants/availableHourConstants';
import { AppThunk } from '../types/utils';
import { AvailableHourDispatchTypes } from '../types/availableHour/availableHourActionTypes';
import { AvailableHour } from '../types/availableHour/availableHour';

const url = 'https://kzh-futsal-stadium.herokuapp.com';

export const getAvailableHours = (
  date: string
): AppThunk<AvailableHourDispatchTypes> => async dispatch => {
  try {
    dispatch({ type: AVAILABLE_HOUR_REQUEST });

    const res = await axios.get(`${url}/api/v1/days/available`, {
      headers: {
        'x-date': date,
      },
    });

    dispatch({
      type: AVAILABLE_HOUR_SUCCESS,
      payload: res.data.data.availableHours,
    });
  } catch (error) {
    dispatch({
      type: AVAILABLE_HOUR_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const toggleSelectedHour = (
  id: string
): AppThunk<AvailableHourDispatchTypes> => dispatch => {
  dispatch({ type: TOGGLE_SELECTED_HOUR, payload: id });
};

export const setDate = (
  date: string
): AppThunk<AvailableHourDispatchTypes> => dispatch => {
  dispatch({ type: SET_AVAILABLE_HOUR_DATE, payload: date });
};
