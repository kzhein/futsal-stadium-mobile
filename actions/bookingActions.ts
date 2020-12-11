import axios, { AxiosResponse } from 'axios';
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_STATUS_RESET,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
  USER_BOOKINGS_RESET,
} from '../constants/bookingConstants';
import { USER_LOGOUT } from '../constants/userConstants';
import { AppThunk } from '../types/utils';
import { BookingDispatchTypes } from '../types/booking/bookingActionTypes';
import { Booking } from '../types/booking/booking';
import { UserDispatchTypes } from '../types/user/userActionTypes';

const url = 'https://kzh-futsal-stadium.herokuapp.com';

export const createNewBooking = (
  newBookings: string[]
): AppThunk<BookingDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST });

    const {
      userAuth: { token },
      availableHourDetails: { date },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      `${url}/api/v1/bookings`,
      {
        date,
        time: newBookings,
      },
      config
    );

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: 'Booking created successfully',
    });
    dispatch({ type: BOOKING_STATUS_RESET });
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: BOOKING_STATUS_RESET });
  }
};

export const resetBookingStatus = (): AppThunk<BookingDispatchTypes> => dispatch => {
  dispatch({ type: BOOKING_STATUS_RESET });
};

export const getUserBookings = (): AppThunk<
  BookingDispatchTypes | UserDispatchTypes
> => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_BOOKINGS_REQUEST });

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
        bookings: Booking[];
      };
    }

    const {
      data: {
        data: { bookings },
      },
    }: AxiosResponse<response> = await axios.get(
      `${url}/api/v1/bookings/getMyBookings`,
      config
    );

    dispatch({
      type: USER_BOOKINGS_SUCCESS,
      payload: bookings,
    });
  } catch (error) {
    dispatch({
      type: USER_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      dispatch({ type: USER_LOGOUT });
    }
  }
};

export const resetUserBookings = (): AppThunk<BookingDispatchTypes> => dispatch => {
  dispatch({ type: USER_BOOKINGS_RESET });
};
