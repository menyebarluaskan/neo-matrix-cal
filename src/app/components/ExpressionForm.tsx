'use client';

import { useState } from "react";
import { evaluateExp } from "../lib/features/matrixSlice";
import { useAppDispatch } from "../lib/hooks";

export default function () {
  const dispatch = useAppDispatch();
  const [expression, setExpression] = useState('');

  function evaluate() {
    try {
      dispatch(evaluateExp(expression))
    } catch (err) {
      //TODO: use toast instead of this kind of alert
      alert(err);
    }
  }
  return (
    <div className="flex justify-center flex-row size-auto p-4">
      <input
        className="flex-3/4 p-2 bg-white text-2xl text-black font-serif italic"
        onChange={(e) => setExpression(e.target.value)}
        autoComplete="off"
        name="expression"
        value={expression}
        type="text" />
      <button
        className="flex-1/4 p-2 bg-lime-800 hover:bg-lime-600 text-2xl focus:outline-2 focus:outline-lime-600"
        onClick={() => evaluate()}
      >Evaluate</button>
    </div>
  )
}
