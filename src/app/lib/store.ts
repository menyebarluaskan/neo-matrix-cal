import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { matrixSlice } from './features/matrixSlice';

const rootReducer = combineSlices(matrixSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
