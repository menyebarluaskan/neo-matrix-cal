import { expect, test, describe } from "vitest";
import { convertToRPN, matrixAdd, MatrixScalarError, MismatchDimError } from "./matrixCalculation";

const matrixA = [
  [1, 2],
  [2, 3],
];

const matrixB = [
  [0, -2],
  [-2, -2],
];

const matrixC = [
  [-1, 1],
  [1, -1],
];

const matrixD = [
  [-1, -2],
  [-2, -3]
];

const matrixE = [[1, 2, 3]];

describe("Expression Parser", () => {
  test("infix expression into postfix", () => {
    const expr = 'A + 100 * B';
    const result = convertToRPN(expr);
    // TODO: we might need readjustment for the result later
    expect(result).toEqual([
      { raw: 'A', isNumber: false, value: undefined },
      { raw: '100', isNumber: true, value: 100 },
      { raw: 'B', isNumber: false, value: undefined },
      { raw: '*', callback: undefined },
      { raw: '+', callback: matrixAdd },
    ]);
  })
});

describe("Matrix Addition", () => {
  test("adding 2 matrices", () => {
    const result = matrixAdd(matrixA, matrixB);

    expect(result).toEqual([
      [1, 0],
      [0, 1],
    ]);
  });

  test("adding 3 matrices", () => {
    const result = matrixAdd(matrixA, matrixAdd(matrixB, matrixC));

    expect(result).toEqual([
      [0, 1],
      [1, 0],
    ]);
  });

  test("adding 2 scalar", () => {
    const result = matrixAdd(1, 2);

    expect(result).toEqual(3);
  });

  test("commutative property", () => {
    expect(matrixAdd(matrixA, matrixB))
      .toEqual(matrixAdd(matrixB, matrixA));
  });

  test("associative property", () => {
    expect(matrixAdd(matrixA, matrixAdd(matrixB, matrixC)))
      .toEqual(matrixAdd(matrixAdd(matrixA, matrixB), matrixC))
  });

  test("identity property", () => {
    const result = matrixAdd(matrixA, 0);
    expect(result).toEqual(matrixA);
  });

  test("inverse property", () => {
    const result = matrixAdd(matrixA, matrixD);
    expect(result).toEqual(0);
  });

  test("failed, adding incompatible dimension", () => {
    expect(() => matrixAdd(matrixA, matrixE)).toThrow(MismatchDimError.message);
  });

  test("failed, adding matrix with scalar", () => {
    expect(() => matrixAdd(matrixA, 1)).toThrow(MatrixScalarError.message);
  });
});

