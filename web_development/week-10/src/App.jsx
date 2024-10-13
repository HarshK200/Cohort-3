import { createContext, useState } from "react";
import "./App.css";
import { atom, RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";


// NOTE: creating a context using CONTEXT API
const bulbContext = createContext();
function BulbProvider({ children }) {
  const [isBulbOn, setIsBulbOn] = useState(false);

  return (
    <bulbContext.Provider
      value={{
        isBulbOn: isBulbOn,
        setIsBulbOn: setIsBulbOn,
      }}
    >
      {children}
    </bulbContext.Provider>
  );
}

const bulbState = atom({
  key: "bulbState",
  default: false,
});

function App() {
  return (
    <RecoilRoot>
      <LightBulb />
    </RecoilRoot>
  );
}

function LightBulb() {
  return (
    <div>
      <BulbState />
      <ToggleBulbState />
    </div>
  );
}

function BulbState() {
  const isBulbOn = useRecoilValue(bulbState);

  return <div>{isBulbOn ? "Bulb is on" : "Bulb is off"}</div>;
}

function ToggleBulbState() {
  const setIsBulbOn = useSetRecoilState(bulbState);

  return (
    <div>
      <button
        onClick={() => {
          setIsBulbOn((prev) => !prev);
        }}
      >
        Toogle bulb
      </button>
    </div>
  );
}

export default App;
