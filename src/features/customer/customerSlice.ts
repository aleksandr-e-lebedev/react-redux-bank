import type { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '@/app/createAppSlice';

export interface CustomerSliceState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

const initialState: CustomerSliceState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

type Customer = CustomerSliceState;

// If you are not using async thunks you can use the standalone `createSlice`.
export const customerSlice = createAppSlice({
  name: 'customer',
  initialState,
  reducers: {
    created: {
      prepare: ({ fullName, nationalID }: Omit<Customer, 'createdAt'>) => {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(), // Side Effect
          },
        };
      },
      reducer: (_state, action: PayloadAction<Customer>) => {
        return action.payload;
      },
    },
  },
  // These selectors receive the slice state as their first argument.
  selectors: {
    selectCustomerFullName: (customer) => customer.fullName,
  },
});

// Action creators are generated for each case reducer function.
export const { created } = customerSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCustomerFullName } = customerSlice.selectors;
