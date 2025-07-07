import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { frankfurterApi } from '@/services/frankfurterApi';
import { customerSlice } from '@/features/customer/customerSlice';
import { accountSlice } from '@/features/account/accountSlice';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(frankfurterApi, customerSlice, accountSlice);

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(frankfurterApi.middleware);
    },
    preloadedState,
  });

  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;
// Export a reusable type for handwritten thunks
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
