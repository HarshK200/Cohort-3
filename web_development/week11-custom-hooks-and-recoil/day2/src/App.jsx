import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counter } from "./store/atoms/counter";

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

function Counter() {
  return (
    <div>
      <Count />
      <Increase />
      <Decrease />
    </div>
  );
}

function Increase() {
  const setCount = useSetRecoilState(counter);

  return (
    <button
      onClick={() => {
        setCount((prev) => prev + 1);
      }}
    >
      + Increase
    </button>
  );
}
function Decrease() {
  const setCount = useSetRecoilState(counter);

  return (
    <button
      onClick={() => {
        setCount((prev) => prev - 1);
      }}
    >
      - Decrease
    </button>
  );
}
function Count() {
  const count = useRecoilValue(counter);
  return <p>{count}</p>;
}

export default App;
