import { SetStateAction, Dispatch } from "react";

interface IProps {
  varName: string;
  rawString: string;
  setRawString: (varName: string) => void;
}

export default function MatrixVars({ varName, rawString, setRawString }: IProps) {
  return (
    <>
      <div className="flex flex-row items-center-safe gap-x-1">
        <div className="size-10 italic font-serif text-2xl">{varName} =</div>
        <textarea className="size-40 bg-white text-black"
          onChange={e => setRawString(e.target.value)}
          defaultValue={rawString}
        >
        </textarea>
      </div>
    </>
  )
}
