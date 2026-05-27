import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MatrixParser from "./matrixParser";

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
    },
    parseMatrix: (state, action: PayloadAction<string>) => {
      const matrix = state.find(matrix => matrix.varName == action.payload);
      if (!matrix) {
        throw new Error('Failed to parse, matrix not found');
      }
      matrix.value = MatrixParser(matrix.rawValue);
    }
  },
});

export const { addNewMatrix, updateMatrix, parseMatrix } = matrixSlice.actions;

export default matrixSlice.reducer;
