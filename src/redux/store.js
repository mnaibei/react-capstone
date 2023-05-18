import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencies/currencySlice';

const store = configureStore({
  reducer: {
    currencies: currencyReducer,
  },
});

export default store;
