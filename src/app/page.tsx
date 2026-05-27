import MatrixPanel from "./components/MatrixPanel";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center gap-2 justify-center bg-zinc-50 font-sans dark:bg-black">
      <MatrixPanel></MatrixPanel>
    </div>
  );
}
