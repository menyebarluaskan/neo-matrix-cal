'use client';
import { useAppSelector } from "@/app/lib/hooks"

export default function () {
  const result = useAppSelector(state => state.matrix.result);
  return (
    <div className="flex flex-row p-4">
      <div className="p-2 text-2xl font-serif">Result =</div>
      <pre className="p-2 font-serif text-2xl border-x-2 border-white rounded-xl ">{result?.rawValue}</pre>
    </div>
  )
}
