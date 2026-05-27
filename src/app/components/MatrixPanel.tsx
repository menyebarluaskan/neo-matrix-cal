"use client";
import AddMatrixBtn from "@/app/components/AddMatrixBtn";
import MatrixVars from "@/app/components/MatrixVars";
import { useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { addNewMatrix, MatrixState, updateMatrix } from "@/app/lib/features/matrixSlice";

const predefVars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
  'V', 'W', 'X', 'Y', 'Z'];

export default function MatrixPanel() {
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
    <>
      <AddMatrixBtn onAddMatrix={onAddMatrix}></AddMatrixBtn>
      <div className="flex flex-row items-stretch flex-wrap gap-2">
        {renderedMatrices}
      </div>
    </>
  );
}
