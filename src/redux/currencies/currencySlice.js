import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.coinlore.net/api/tickers/';

const initialState = {
  currencies: [],
  isLoading: false,
  error: null,
};

export const getCurrencies = createAsyncThunk('currencies/getCurrencies', async () => {
  const response = axios.get(url);
  const test = (await response).data;
  return test.data;
});

const currencySlice = createSlice({
  name: 'currencies',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currencies = action.payload;
        state.error = null;
      })
      .addCase(getCurrencies, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;
