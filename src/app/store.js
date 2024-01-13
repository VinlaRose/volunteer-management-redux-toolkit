import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import eventSlice from '../features/events/eventSlice';
import volunteerSlice from '../features/volunteers/volunteerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    events: eventSlice,
    volunteers: volunteerSlice
  },
});
