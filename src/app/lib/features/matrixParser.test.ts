import { expect, test, describe } from "vitest";
import { parseMatrix } from "./matrixParser";

describe("Matrix Parser", () => {
  test("parse matrix with blank new line", () => {
    const rawValue = `
1 2 3

`;
    const value = parseMatrix(rawValue);
    expect(value).toEqual([[1, 2, 3]]);
  });

  test("parse 2x2 matrix", () => {
    const rawValue = `
1 2
2 1`;
    const value = parseMatrix(rawValue);
    expect(value).toEqual([
      [1, 2],
      [2, 1],
    ]);
  });

  test("parse 3x3 matrix", () => {
    const rawValue = `
1 2 3
2 3 1
3 1 2`;
    const value = parseMatrix(rawValue);
    expect(value).toEqual([
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
    ]);
  });

  test("parse 1x1 matrix into scalar", () => {
    const rawValue = `1`;
    const value = parseMatrix(rawValue);
    expect(value).toEqual(1);
  });

  test("parse matrix with extra space", () => {
    const rawValue = `
1 2  3
2 3 1 
  3 1 2`;
    const value = parseMatrix(rawValue);
    expect(value).toEqual([
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
    ]);
  });

  test("parse empty matrix as NaN", () => {
    const rawValue = `
  `;
    const value = parseMatrix(rawValue);
    expect(value).toBeNaN();
  });

  test("failed invalid matrix dimension", () => {
    const rawValue = `
1 2 3
2 3 
3 1 2`;
    expect(() => parseMatrix(rawValue)).toThrow('Failed to Parse, invalid dimension');
  });

  test("failed invalid character", () => {
    const rawValue = `
1 2 3
2 3 a
3 1 2`;
    expect(() => parseMatrix(rawValue)).toThrow('Failed to Parse, invalid character');
  });
});
