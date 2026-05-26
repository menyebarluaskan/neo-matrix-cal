import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNumberObject } from "util/types";

export interface MatrixState {
  varName: string;
  value: Array<Array<Number>> | Number;
  rawValue: string;
};

const initialState: MatrixState[] = [];

export const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    addNewMatrix: (state, action: PayloadAction<string>) => {
      state = [...state, { varName: action.payload, value: NaN, rawValue: "" }]
    },
    updateMatrix: (state, action: PayloadAction<MatrixState>) => {
      const matrix = state.find(matrix => matrix.varName == action.payload.varName);
      if (!matrix) {
        state = [...state, action.payload];
        return;
      }
      matrix.value = action.payload.value;
      matrix.rawValue = action.payload.rawValue;
    }
  },
});

export const { addNewMatrix, updateMatrix } = matrixSlice.actions;

export default matrixSlice.reducer;
