import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userAuthReducer, userLoadReducer } from './reducers/userReducers';
import { availableHourReducer } from './reducers/availableHourReducers';
import {
  newBookingReducer,
  userBookingsReducer,
} from './reducers/bookingReducers';

const reducer = combineReducers({
  availableHourDetails: availableHourReducer,
  userAuth: userAuthReducer,
  userLoad: userLoadReducer,
  newBooking: newBookingReducer,
  userBookings: userBookingsReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof reducer>;

export default store;
