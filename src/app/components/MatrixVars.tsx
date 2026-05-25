import { SetStateAction, Dispatch } from "react";

interface IProps {
  varName: string;
  rawString: string;
  setRawString: Dispatch<SetStateAction<string>>;
}

export default function MatrixVars({ varName, rawString, setRawString }: IProps) {
  return (
    <>
      <div className="flex flex-row items-center">
        <span className="italic font-serif text-2xl">{varName}</span>
        &nbsp;=&nbsp;
        <textarea className="bg-white text-black"
          onChange={e => setRawString(e.target.value)}
          defaultValue={rawString}
        >
        </textarea>
      </div>
    </>
  )
}
