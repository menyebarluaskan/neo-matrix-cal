import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MatrixState {
  varName: string;
  value: Array<Array<Number>> | Number;
  rawValue: string;
};

const initialState: MatrixState = {
  varName: "",
  value: NaN,
  rawValue: ""
};

export const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    updateVarName: (state, action: PayloadAction<string>) => {
      state.varName = action.payload;
    },
    parse: state => {
      // TODO: add matrix parser and update the value
    },
    updateRawString: (state, action: PayloadAction<string>) => {
      state.rawValue = action.payload;
    },
  },
  selectors: {
    selectVarName: (matrix) => matrix.varName,
    selectValue: (matrix) => matrix.value,
    selectRawString: (matrix) => matrix.rawValue,
  }
});

export const { parse, updateVarName, updateRawString } = matrixSlice.actions;
export const { selectValue, selectRawString, selectVarName } = matrixSlice.selectors;

export default matrixSlice.reducer;
