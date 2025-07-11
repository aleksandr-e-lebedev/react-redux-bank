// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FRANKFURTER_BASE_URL } from '@/config';
import type { Rates } from './types';

export interface ConvertedCurrency {
  amount: number;
  base: string;
  date: string;
  rates: Record<Rates, number>;
}

export interface CurrencyToConvert {
  amount: number;
  currency: 'EUR' | 'GBP';
}

// Define a service using a base URL and expected endpoints
export const frankfurterApi = createApi({
  reducerPath: 'frankfurterApi',
  baseQuery: fetchBaseQuery({ baseUrl: FRANKFURTER_BASE_URL }),
  endpoints: (builder) => ({
    convertCurrency: builder.query<ConvertedCurrency, CurrencyToConvert>({
      query: ({ amount, currency }) =>
        `?amount=${String(amount)}&from=${currency}&to=USD`,
    }),
  }),
});

export const { useConvertCurrencyQuery, useLazyConvertCurrencyQuery } =
  frankfurterApi;
