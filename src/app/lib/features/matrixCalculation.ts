export const MismatchDimError = Error("matrix dimension is mismatched");
export const MatrixScalarError = Error("matrix cannot be added with scalar value");

type matrixData = number | number[][];

interface Token {
  raw: string;
  type: string;
}

interface Operator extends Token {
  type: 'Operator';
  callback: (a: matrixData, b: matrixData) => matrixData;
}

export interface Operand extends Token {
  type: 'Operand';
  value?: matrixData;
  isNumber: boolean;
}

interface Parens extends Token {
  type: 'Parens';
  isFunc: boolean;
}

interface Func extends Token {
  type: 'Func';
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
  let isParsingNumber = false;
  for (let i = 0; i < expression.length; i++) {
    const ch = expression[i];
    if (ch >= 'A' && ch <= 'Z') {
      const temp: Operand = {
        type: 'Operand',
        raw: ch,
        value: undefined,
        isNumber: false
      }
      tokens.push(temp);
      console.log('operand added. token: ', tokens);
      continue;
    }

    if (ch >= '0' && ch <= '9' || ch === '.') {
      const num = tokens[tokens.length - 1] as Operand | undefined;
      if (isParsingNumber && num?.isNumber) {
        num.raw += ch;
        num.value = Number(num.raw);
        console.log('operand added. token: ', tokens);
        continue;
      }
      isParsingNumber = true;
      const temp: Operand = {
        type: 'Operand',
        raw: ch,
        isNumber: true,
        value: Number(ch)
      }
      tokens.push(temp);
      console.log('operand added. token: ', tokens);
      continue;
    }

    if (ch === '(') {
      isParsingNumber = false;
      console.log('found open parentheses');
      const lParens: Parens = { type: 'Parens', raw: ch, isFunc: false }
      operators.push(lParens);
      console.log('parens queued. queue: ', operators);
      if (isFunc(expression[i - 1])) {
        const func: Func = {
          type: 'Func',
          raw: expression[i - 1],
          callback: funcMapping.get(expression[i - 1])!
        }
        operators.push(func);
        console.log('func queued. queue: ', operators);
      }
      continue;
    }

    if (ch === ')') {
      isParsingNumber = false;
      console.log('found closing parentheses');
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
      isParsingNumber = false;
      if (operators.length === 0 || operators.find((c) => c.raw === '(')) {
        const op: Operator = {
          type: 'Operator',
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
        type: 'Operator',
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

export function evaluateFormula(expression: Token[]): matrixData {
  const evaluationStack: Token[] = [];

  for (const token of expression) {
    switch (token.type) {
      case 'Operand':
        evaluationStack.push(token);
        break;

      case 'Operator':
        const b = evaluationStack.pop() as Operand | undefined;
        const a = evaluationStack.pop() as Operand | undefined;
        if (!(a?.value && b?.value)) {
          throw new Error('Operator Evaluation Error, please check if the expression is valid.');
        }
        const operator = token as Operator;
        const result = operator.callback(a.value, b.value);
        const c: Operand = {
          raw: `${a.raw} ${b.raw} ${operator.raw}`,
          type: 'Operand',
          isNumber: typeof result === 'number',
          value: result
        }
        evaluationStack.push(c);
        break;

      case 'Func':
        const x = evaluationStack.pop() as Operand | undefined;
        if (!(x?.value)) {
          throw new Error('Func Evaluation Error, please check if the expression is valid.');
        }
        const func = token as Func;
        const res = func.callback(x.value);
        const y: Operand = {
          type: 'Operand',
          raw: `${x.raw} ${func.raw}`,
          isNumber: typeof res === 'number',
          value: res
        }
        evaluationStack.push(y);
        break;
      default:
        //NOTE: we might need to find a way to catch error earlier for this if this error message showing up.
        throw new Error('Evaluation Error, pelase check if the expression is valid.');
    }
  }

  if (evaluationStack.length !== 1) {
    throw new Error('Evaluation Stack Error, pelase check if the expression is valid.');
  }
  const evalResult = evaluationStack.pop() as Operand | undefined;
  if (!evalResult?.value) {
    throw new Error('Evaluation Result Error, pelase check if the expression is valid.');
  }
  return evalResult.value;
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
