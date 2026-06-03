import { expect, test, describe } from "vitest";
import {
  convertToRPN,
  evaluateFormula,
  matrixAdd,
  MatrixScalarError,
  MismatchDimError
} from "./matrixCalculation";

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
  test("scalar infix to postfix", () => {
    const expr = '100 + (200 + 300)';
    const result = convertToRPN(expr);
    // TODO: we might need readjustment for the result later
    expect(result).toEqual([
      { type: 'Operand', raw: '100', isNumber: true, value: 100 },
      { type: 'Operand', raw: '200', isNumber: true, value: 200 },
      { type: 'Operand', raw: '300', isNumber: true, value: 300 },
      { type: 'Operator', raw: '+', callback: matrixAdd },
      { type: 'Operator', raw: '+', callback: matrixAdd },
    ]);
  });

  test("scalar with decimals infix to postfix", () => {
    const expr = '100.50 + (200.50 + 300)';
    const result = convertToRPN(expr);
    // TODO: we might need readjustment for the result later
    expect(result).toEqual([
      { type: 'Operand', raw: '100.50', isNumber: true, value: 100.5 },
      { type: 'Operand', raw: '200.50', isNumber: true, value: 200.5 },
      { type: 'Operand', raw: '300', isNumber: true, value: 300 },
      { type: 'Operator', raw: '+', callback: matrixAdd },
      { type: 'Operator', raw: '+', callback: matrixAdd },
    ]);
  });

  test("complex infix expression into postfix", () => {
    const expr = 'A + 100 * (B + t(C))';
    const result = convertToRPN(expr);
    // TODO: we might need readjustment for the result later
    expect(result).toEqual([
      { type: 'Operand', raw: 'A', isNumber: false, value: undefined },
      { type: 'Operand', raw: '100', isNumber: true, value: 100 },
      { type: 'Operand', raw: 'B', isNumber: false, value: undefined },
      { type: 'Operand', raw: 'C', isNumber: false, value: undefined },
      { type: 'Func', raw: 't', callback: undefined },
      { type: 'Operator', raw: '+', callback: matrixAdd },
      { type: 'Operator', raw: '*', callback: undefined },
      { type: 'Operator', raw: '+', callback: matrixAdd },
    ]);
  });
});

describe("Evaluate Formula", () => {
  test('scalar evaluation', () => {
    const rawExpr = '100 + (200 + 300)';
    const expr = convertToRPN(rawExpr);
    const result = evaluateFormula(expr);
    expect(result).toEqual(600);
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

