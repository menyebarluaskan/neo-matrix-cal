import { expect, test, describe } from "vitest";
import { useAppSelector } from "@/app/lib/hooks";
import { addNewMatrix, MatrixState, updateMatrix } from "@/app/lib/features/matrixSlice";

let matrixStore: MatrixState[];

describe.skip('Matrix Slice Store', () => {
  // test('initialize', () => {
  //   matrixStore = useAppSelector(state => state.matrix);
  //   expect(matrixStore).toHaveLength(0);
  // });
  //
  // test('add new empty matrix', () => {
  //   addNewMatrix('A');
  //
  //   expect(matrixStore).toHaveLength(1);
  //   expect(matrixStore).toContainEqual({ varName: 'A', value: NaN, rawValue: '' });
  // });
  //
  // test('update matrix raw value', () => {
  //   updateMatrix({ varName: 'A', value: NaN, rawValue: '1 2 3\n3 3 3\n4 2 1' });
  //
  //   expect(matrixStore)
  //     .toContainEqual({ varName: 'A', value: NaN, rawValue: '1 2 3\n3 3 3\n4 2 1' });
  // });
});
