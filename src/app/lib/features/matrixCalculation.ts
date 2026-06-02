import MatrixParser from "./matrixParser";

export const MismatchDimError = Error("matrix dimension is mismatched");
export const MatrixScalarError = Error("matrix cannot be added with scalar value");

type matrixData = number | number[][];

interface Token {
  raw: string;
}

interface Operator extends Token {
  callback: (a: matrixData, b: matrixData) => matrixData;
}

interface Operand extends Token {
  value?: matrixData;
  isNumber: boolean;
}

interface Parens extends Token {
  isFunc: boolean;
}

interface Func extends Token {
  callback: (a: matrixData) => matrixData;
}

function isOperator(ch: string): boolean {
  return '-+*()'.indexOf(ch) > 0;
}

function isFunc(ch: string): boolean {
  return 'dirt'.indexOf(ch) > 0;
}

function isLowerPriority(a: string, b: string): boolean {
  if ('+-*('.indexOf(a) < 0 || '+-*('.indexOf(b) < 0) {
    return false;
  }
  const mapping: Map<string, number> = new Map([
    ["+", 1],
    ["-", 1],
    ["*", 2],
    ["(", 3],
  ]);
  return mapping.get(a)! <= mapping.get(b)!;
}

export function convertToRPN(expression: string): Token[] {
  const tokens: Token[] = [];
  const operators: Token[] = [];
  for (let i = 0; i < expression.length; i++) {
    const ch = expression[i];
    if (ch >= 'A' && ch <= 'Z') {
      const temp: Operand = {
        raw: ch,
        value: undefined,
        isNumber: false
      }
      tokens.push(temp);
      console.log('operand added. token: ', tokens);
      continue;
    }

    if (ch >= '0' && ch <= '9') {
      const num = tokens[tokens.length - 1] as Operand;
      if (num.isNumber) {
        num.raw += ch;
        num.value = Number(num.raw);
        console.log('operand added. token: ', tokens);
        continue;
      }
      const temp: Operand = {
        raw: ch,
        isNumber: true,
        value: Number(ch)
      }
      tokens.push(temp);
      console.log('operand added. token: ', tokens);
      continue;
    }

    if (ch === '(') {
      const lParens: Parens = { raw: ch, isFunc: false }
      operators.push(lParens);
      console.log('parens queued. queue: ', operators);
      if (isFunc(expression[i - 1])) {
        const func: Func = {
          raw: expression[i - 1],
          callback: funcMapping.get(expression[i - 1])!
        }
        operators.push(func);
        console.log('func queued. queue: ', operators);
      }
      continue;
    }

    if (ch === ')') {
      let op = operators.pop();
      console.log('queue reduced', operators, "op: ", op);
      while (op && op.raw !== '(') {
        tokens.push(op);
        console.log('operator added. token: ', tokens);
        op = operators.pop();
        console.log('queue reduced', operators, "op: ", op);
      }
      if (op) {
        const rParens = op as Parens;
        if (rParens.isFunc) {
          const funcOp = operators.pop();
          console.log('queue reduced', operators, "op: ", op);
          if (funcOp) {
            console.log('func last pop triggered', funcOp, tokens, operators);
          }
        }
      }
      continue;
    }

    if (isOperator(ch)) {
      if (operators.length === 0) {
        const op: Operator = {
          raw: ch,
          callback: opMapping.get(ch)!
        }
        operators.push(op);
        console.log('operator queued. queue: ', operators);
        continue;
      }

      let lastOp = operators[operators.length - 1];
      while (operators.length > 0 && isLowerPriority(ch, lastOp.raw)) {
        tokens.push(operators.pop()!);
        console.log('queue reduced', operators);
        console.log('operator added. token: ', tokens);
        lastOp = operators[operators.length - 1];
      }
      const op: Operator = {
        raw: ch,
        callback: opMapping.get(ch)!
      }
      operators.push(op);
      console.log('operator queued. queue: ', operators);
    }
  }

  while (operators.length > 0) {
    tokens.push(operators.pop()!);
    console.log('queue reduced', operators);
    console.log('operator added. token: ', tokens);
  }
  return tokens;
}

const funcMapping: Map<string, (a: matrixData) => matrixData> = new Map([
  ["i", (a: matrixData) => 0],
]);

const opMapping: Map<string, (a: matrixData, b: matrixData) => matrixData> = new Map([
  ["+", matrixAdd],
]);

export function matrixAdd(a: matrixData, b: matrixData): matrixData {
  if (a === 0) {
    return b;
  }
  if (b === 0) {
    return a;
  }

  if (typeof a !== typeof b) {
    throw MatrixScalarError;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  const matA: number[][] = a as number[][];
  const matB: number[][] = b as number[][];

  if (matA.length !== matB.length) {
    throw MismatchDimError;
  }

  const result: number[][] = [];

  for (let i = 0; i < matA.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < matA[i].length; j++) {
      row.push(matA[i][j] + matB[i][j]);
    }
    result.push(row);
  }

  const zeroCheck = result.flat().reduce((x, y) => x + y);

  if (zeroCheck === 0) {
    return 0;
  }

  return result;
}
