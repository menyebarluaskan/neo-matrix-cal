"use client";
import AddMatrixBtn from "./components/AddMatrixBtn"
import MatrixVars from "./components/MatrixVars";
import { useState } from "react";

const predefVars = ['A', 'B', 'C'];

export default function Home() {
  const [lastIndex, setLastIndex] = useState(0);
  const [state, setState] = useState<Array<string>>([]);
  function onAddMatrix() {
    setLastIndex(lastIndex + 1);
    if (state.length >= predefVars.length) {
      // TODO: handle overflow with toast?
      return;
    }
    setState([...state, predefVars[lastIndex]]);
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <AddMatrixBtn onAddMatrix={onAddMatrix}></AddMatrixBtn>
      <div className="flex flex-row flex-wrap">
        {state.map(
          (varName) =>
          (<MatrixVars
            key={varName}
            varName={varName}
            rawString=""
            setRawString={() => { }}
          ></MatrixVars>))}
      </div>

    </div>
  );
}
