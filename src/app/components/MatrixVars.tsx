interface IProps {
  varName: string;
  rawString: string;
  setRawString: (varName: string) => void;
}

export default function MatrixVars({ varName, rawString, setRawString }: IProps) {
  return (
    <div className="flex m-2 flex-row items-center-safe gap-x-1">
      <div className="size-10 italic font-serif text-2xl">{varName} =</div>
      <textarea className="size-40 p-2 font-serif text-2xl border-x-2 border-white rounded-xl"
        onChange={e => setRawString(e.target.value)}
        defaultValue={rawString}
      >
      </textarea>
    </div>
  )
}
