import "./App.css";

function App() {
  return (
    <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
      <h1>react dezznuts</h1>
      <PostComponent />
    </div>
  );
}

function PostComponent() {
  return (
    <div
      style={{
        width: "650px",
        height: "600px",
        backgroundColor: "silver",
        borderRadius: "10px",
      }}
    >
      <img src="./src/assets/react.svg" width={40} height={40}/>
    </div>
  );
}

export default App;
