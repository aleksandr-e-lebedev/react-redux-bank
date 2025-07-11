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

// If you are not using async thunks you can use the standalone `createSlice`.
export const accountSlice = createAppSlice({
  name: 'account',
  initialState,
  reducers: {},
  selectors: {
    selectBalance: (account) => account.balance,
  },
});

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectBalance } = accountSlice.selectors;
