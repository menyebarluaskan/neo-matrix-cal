export default function MatrixParser(rawValue: string): Number[][] | Number {
  const matrix: Number[][] = [];

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
