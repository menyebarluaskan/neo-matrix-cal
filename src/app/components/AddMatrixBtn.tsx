interface IProps {
  onAddMatrix: () => void;
}

export default function AddMatrixBtn({ onAddMatrix }: IProps) {
  return (
    <>
      <button
        className="bg-gray-800 hover:bg-white hover:text-black text-2xl p-2 focus:outline-2 focus:outline-white"
        onClick={() => onAddMatrix()}>Add Matrix</button>
    </>
  )
}
