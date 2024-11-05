import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

function UseRefWithValue() {
  const [clockVal, setClockVal] = useState(0);
  let id = useRef(null);

  useEffect(() => {
    return () => {
      if (id.current) {
        clearInterval(id.current);
      }
    };
  }, []);

  function handleClockStart() {
    id.current = setInterval(() => {
      console.log("clock should update");
      setClockVal((prev) => prev + 1);
    }, 1000);
  }
  function handleClockStop() {
    if (id.current) {
      console.log("clock should stop");
      clearInterval(id.current);
      id.current = null;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 0",
      }}
    >
      <h1>Clock: {clockVal}</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={handleClockStart}>Start</button>
        <button onClick={handleClockStop}>Stop</button>
      </div>
    </div>
  );
}

function UseRefWithDOMElement() {
  const usernameEleRef = useRef();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={{ margin: "auto" }}>Signup</h3>
      <div style={{ margin: "auto" }}>
        <span style={{ margin: "0 0.6rem 0 1rem" }}>Username</span>
        <input ref={usernameEleRef} type="text" />
      </div>
      <div style={{ margin: "auto" }}>
        <span style={{ margin: "0 1rem" }}>Password</span>
        <input type="text" />
      </div>
      <button
        style={{ padding: "0.3rem 1rem", width: "100px", margin: "auto" }}
        onClick={() => {
          console.log(usernameEleRef.current);
          usernameEleRef.current.focus();
        }}
      >
        Submit
      </button>
    </div>
  );
}

function TestComp() {
  return (
    <div>
      <h3>HI from test comp</h3>
    </div>
  );
}

function LearningReactRouterDOM() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyLayout />}>
            <Route path="/" element={<div>Hello world</div>} />
            <Route path="/dezznuts" element={<Dezznuts />} />
            <Route path="*" element={<div>Not found!</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function MyLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <footer>Contact Now | 91+ 12321321123</footer>
    </div>
  );
}
function Dezznuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <div>Dezznuts (you'll be redirect to home page after 2 sec.)</div>;
}
function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/dezznuts">dezznuts</Link>
    </nav>
  );
}

export default UseRefWithValue;
