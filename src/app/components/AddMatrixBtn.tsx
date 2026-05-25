interface IProps {
  onAddMatrix: () => void;
}

export default function AddMatrixBtn({ onAddMatrix }: IProps) {
  return (
    <>
      <button onClick={() => onAddMatrix()}>Add Matrix</button>
    </>
  )
}
