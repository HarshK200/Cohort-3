import { useState, createContext, useContext } from "react";

const bulbContext = createContext();

function BulbProvider({ children }) {
  const [isBulbOn, setIsBulbOn] = useState(false);

  return (
    <bulbContext.Provider
      value={{ isBulbOn: isBulbOn, setIsBulbOn: setIsBulbOn }}
    >
      {children}
    </bulbContext.Provider>
  );
}

function App() {
  return (
    <BulbProvider>
      <LightBulbWithContext />
    </BulbProvider>
  );
}

function LightBulbWithContext() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
        gap: "1rem",
      }}
    >
      <BulbWithContext />
      <SwitchWithContext />
    </div>
  );
}
function BulbWithContext() {
  const { isBulbOn } = useContext(bulbContext);

  return isBulbOn ? (
    <img src="/lighton.svg" width={60} />
  ) : (
    <img src="/lightoff.svg" width={60} />
  );
}
function SwitchWithContext() {
  const { isBulbOn, setIsBulbOn } = useContext(bulbContext);

  return (
    <button
      style={{
        padding: "0.5rem 1rem",
      }}
      onClick={() => {
        setIsBulbOn((prev) => !prev);
      }}
    >
      {isBulbOn && "Turn off"}
      {!isBulbOn && "Turn on"}
    </button>
  );
}

function LightBulbWithoutContext() {
  const [isBulbOn, setIsBulbOn] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
        gap: "1rem",
      }}
    >
      <Bulb isBulbOn={isBulbOn} />
      <Switch isBulbOn={isBulbOn} setIsBulbOn={setIsBulbOn} />
    </div>
  );
}
function BulbWithoutContext({ isBulbOn }) {
  return isBulbOn ? (
    <img src="/lighton.svg" width={60} />
  ) : (
    <img src="/lightoff.svg" width={60} />
  );
}
function SwitchWithoutContext({ isBulbOn, setIsBulbOn }) {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
      }}
      onClick={() => {
        setIsBulbOn((prev) => !prev);
      }}
    >
      {isBulbOn && "Turn off"}
      {!isBulbOn && "Turn on"}
    </button>
  );
}

export default App;
