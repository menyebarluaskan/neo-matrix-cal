export function parseMatrix(rawValue: string): number[][] | number {
  const matrix: number[][] = [];

  const trimmed = rawValue.trim();

  const rawRow = trimmed.split('\n');
  const trimmedRow = rawRow.map(row => row.trim());

  const rawMatrix = trimmedRow.map(row => row.split(' '));

  for (const rowString of rawMatrix) {
    const row = [];
    for (const cell of rowString) {
      if (cell === '') continue;
      if (isNaN(Number(cell))) {
        throw new Error('Failed to Parse, invalid character');
      }
      row.push(Number(cell));
    }
    matrix.push(row);
  }

  if (matrix.length === 1) {
    if (matrix[0].length === 0) {
      return NaN;
    }
    if (matrix[0].length === 1) {
      return matrix[0][0];
    }
  }

  let width: number;
  matrix
    .map(row => row.length)
    .forEach((len, i) => {
      if (i === 0) {
        width = len;
        return;
      }
      if (width !== len) {
        throw new Error('Failed to Parse, invalid dimension');
      }
    });
  return matrix;
}

export function stringifyMatrix(matrix: number | number[][]): string {
  if (!isNaN(matrix as number)) {
    return `${matrix}`;
  }
  const trueMatrix = matrix as number[][];
  return trueMatrix.map(row => row.join(" ")).join("\n")
}
