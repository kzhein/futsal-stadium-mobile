import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_STATUS_RESET,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
  USER_BOOKINGS_RESET,
} from '../../constants/bookingConstants';
import { Booking } from './booking';

export interface BookingCreateRequest {
  type: typeof BOOKING_CREATE_REQUEST;
}

export interface BookingCreateSuccess {
  type: typeof BOOKING_CREATE_SUCCESS;
  payload: string;
}

export interface BookingStatusReset {
  type: typeof BOOKING_STATUS_RESET;
}

export interface BookingCreateFail {
  type: typeof BOOKING_CREATE_FAIL;
  payload: string;
}

export interface UserBookingsRequest {
  type: typeof USER_BOOKINGS_REQUEST;
}

export interface UserBookingsSuccess {
  type: typeof USER_BOOKINGS_SUCCESS;
  payload: Booking[];
}

export interface UserBookingsReset {
  type: typeof USER_BOOKINGS_RESET;
}

export interface UserBookingsFail {
  type: typeof USER_BOOKINGS_FAIL;
  payload: string;
}

export type BookingDispatchTypes =
  | BookingCreateRequest
  | BookingCreateSuccess
  | BookingCreateFail
  | BookingStatusReset
  | UserBookingsRequest
  | UserBookingsSuccess
  | UserBookingsReset
  | UserBookingsFail;
