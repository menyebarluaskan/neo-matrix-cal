interface IProps {
  onAddMatrix: () => void;
}

export default function AddMatrixBtn({ onAddMatrix }: IProps) {
  return (
    <>
      <button
        className="hover:bg-white hover:text-black caret-amber-50 text-2xl"
        onClick={() => onAddMatrix()}>Add Matrix</button>
    </>
  )
}
