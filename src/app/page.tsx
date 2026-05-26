"use client";
import AddMatrixBtn from "./components/AddMatrixBtn"
import MatrixVars from "./components/MatrixVars";
import { useState } from "react";
import { useAppSelector } from "./lib/hooks";
import { addNewMatrix, MatrixState, updateMatrix } from "./lib/features/matrixSlice";

const predefVars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
  'V', 'W', 'X', 'Y', 'Z'];

export default function Home() {
  const [lastIndex, setLastIndex] = useState(0);
  const matricesSelector = useAppSelector(state => state.matrix);
  const [matrices, setMatrices] = useState<Array<MatrixState>>(matricesSelector.slice());
  function onAddMatrix() {
    setLastIndex(lastIndex + 1);
    if (matrices.length >= predefVars.length) {
      // TODO: handle overflow with toast?
      return;
    }
    setMatrices([...matrices, { varName: predefVars[lastIndex], value: NaN, rawValue: "" }]);
    addNewMatrix(predefVars[lastIndex]);
  }
  const renderedMatrices = matrices.map(
    (matrix) =>
    (<MatrixVars
      key={matrix.varName}
      varName={matrix.varName}
      rawString={matrix.rawValue}
      setRawString={(rawValue) => updateMatrix({
        varName: matrix.varName,
        value: matrix.value,
        rawValue: rawValue
      })}
    ></MatrixVars>));

  return (
    <div className="flex flex-col flex-1 items-center gap-2 justify-center bg-zinc-50 font-sans dark:bg-black">
      <AddMatrixBtn onAddMatrix={onAddMatrix}></AddMatrixBtn>
      <div className="flex flex-row items-stretch flex-wrap gap-2">
        {renderedMatrices}
      </div>

    </div>
  );
}
