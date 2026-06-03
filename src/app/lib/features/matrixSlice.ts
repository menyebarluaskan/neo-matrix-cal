import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseMatrix, stringifyMatrix } from "./matrixParser";
import { convertToRPN, evaluateFormula, Operand } from "./matrixCalculation";

export interface Matrix {
  varName: string;
  value: Array<Array<number>> | number;
  rawValue: string;
};

export interface MatrixState {
  matrices: Array<Matrix>;
  result?: Matrix;
}

const initialState: MatrixState = {
  matrices: [],
};

export const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    addNewMatrix: (state, action: PayloadAction<string>) => {
      state.matrices = [...state.matrices, { varName: action.payload, value: NaN, rawValue: "" }]
    },
    updateMatrix: (state, action: PayloadAction<Matrix>) => {
      const matrix = state.matrices.find(matrix => matrix.varName === action.payload.varName);
      if (!matrix) {
        state.matrices = [...state.matrices, action.payload];
        return;
      }
      matrix.value = action.payload.value;
      matrix.rawValue = action.payload.rawValue;
    },
    // parseMatrix: (state, action: PayloadAction<string>) => {
    //   const matrix = state.matrices.find(matrix => matrix.varName === action.payload);
    //   if (!matrix) {
    //     throw new Error('Failed to parse, matrix not found');
    //   }
    //   matrix.value = parseMatrix(matrix.rawValue);
    // },
    evaluateExp: (state, action: PayloadAction<string>) => {
      const exp = convertToRPN(action.payload);
      // Loading Matrices from store
      for (const token of exp) {
        if (token.type !== 'Operand') {
          continue;
        }
        const operand = token as Operand;
        if (operand.isNumber) {
          continue;
        }
        const matrix = state.matrices.find(matrix => matrix.varName === operand.raw);
        if (!matrix) {
          throw new Error('Failed to parse, matrix not found');
        }
        if (isNaN(matrix.value as number)) {
          matrix.value = parseMatrix(matrix.rawValue);
          matrix.rawValue = stringifyMatrix(matrix.value);
        }
        operand.value = matrix.value;
      }
      const result = evaluateFormula(exp);
      state.result = {
        varName: 'result',
        value: result,
        rawValue: stringifyMatrix(result)
      };
    },
  },
});

export const { addNewMatrix, updateMatrix, evaluateExp } = matrixSlice.actions;

export default matrixSlice.reducer;
