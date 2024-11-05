import { useState, createContext, useContext, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";

function App() {
  const [glitch, setGlitch] = useState(1);
  const [count, setCount] = useState(0);
  const prev = usePrev(count);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setGlitch((prev) => prev + 1);
        }}
      >
        Glitch
      </button>
      <p>The previous value was {prev}</p>
    </div>
  );
}

const countContext = createContext();
function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <countContext.Provider value={{ count: count, setCount: setCount }}>
      {children}
    </countContext.Provider>
  );
}
function useCount() {
  const { count, setCount } = useContext(countContext);
  function increment() {
    setCount((prev) => prev + 1);
  }
  return { count: count, increment: increment };
}

function TestingUseFetch() {
  const [currentTab, setCurrentTab] = useState(1);
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/" + currentTab,
    "GET",
  );

  return (
    <CountProvider>
      {loading ? "loading..." : <h1>{JSON.stringify(data)}</h1>}
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            setCurrentTab(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setCurrentTab(2);
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            setCurrentTab(3);
          }}
        >
          3
        </button>
      </div>
      <Counter />
    </CountProvider>
  );
}

function Counter() {
  const { count, increment } = useCount();

  return (
    <div>
      <h1>Count {count}</h1>
      <button onClick={increment}>Increase</button>
    </div>
  );
}

export default App;
