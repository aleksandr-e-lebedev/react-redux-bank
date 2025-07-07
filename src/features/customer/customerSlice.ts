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

// If you are not using async thunks you can use the standalone `createSlice`.
export const customerSlice = createAppSlice({
  name: 'customer',
  initialState,
  reducers: {},
});
