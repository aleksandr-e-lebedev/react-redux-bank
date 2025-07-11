import type { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '@/app/createAppSlice';

export interface AccountSliceState {
  balance: number;
  deposit: number;
  loan: {
    amount: number;
    purpose: string;
  };
}

const initialState: AccountSliceState = {
  balance: 0,
  deposit: 0,
  loan: {
    amount: 0,
    purpose: '',
  },
};

interface MoneyToDeposit {
  amount: number;
  currency: 'USD';
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const accountSlice = createAppSlice({
  name: 'account',
  initialState,
  reducers: {
    moneyDeposited: (state, action: PayloadAction<MoneyToDeposit>) => {
      state.balance = state.balance + action.payload.amount;
      state.deposit = state.deposit + action.payload.amount;
    },
  },
  selectors: {
    selectBalance: (account) => account.balance,
  },
});

// Action creators are generated for each case reducer function.
export const { moneyDeposited } = accountSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectBalance } = accountSlice.selectors;
