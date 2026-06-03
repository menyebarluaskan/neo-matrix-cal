"use client";
import AddMatrixBtn from "@/app/components/AddMatrixBtn";
import MatrixVars from "@/app/components/MatrixVars";
import { addNewMatrix, updateMatrix } from "@/app/lib/features/matrixSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";

const predefVars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
  'V', 'W', 'X', 'Y', 'Z'];

export default function MatrixPanel() {
  const dispatch = useAppDispatch();
  const matricesSelector = useAppSelector(state => state.matrix.matrices);
  const [lastIndex, setLastIndex] = useState(matricesSelector.length);
  function onAddMatrix() {
    setLastIndex(lastIndex + 1);
    if (matricesSelector.length >= predefVars.length) {
      // TODO: handle overflow with toast?
      alert('all of possible variable name is exhausted');
      return;
    }
    dispatch(addNewMatrix(predefVars[lastIndex]));
  }
  const renderedMatrices = matricesSelector.map(
    (matrix) =>
    (<MatrixVars
      key={matrix.varName}
      varName={matrix.varName}
      rawString={matrix.rawValue}
      setRawString={(rawValue) => dispatch(updateMatrix({
        varName: matrix.varName,
        value: matrix.value,
        rawValue: rawValue
      }))}
    ></MatrixVars>));

  return (
    <>
      <AddMatrixBtn onAddMatrix={onAddMatrix}></AddMatrixBtn>
      <div className="flex flex-row items-stretch flex-wrap gap-2 p-4">
        {renderedMatrices}
      </div>
    </>
  );
}
