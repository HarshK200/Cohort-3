import "./App.css";

function App() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#F4F2EE",
        fontFamily: "sans-serif",
        gap: "1rem",
      }}
    >
      <h1 style={{ padding: "2rem 0rem 0rem 0rem" }}>Linked In</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PostComponent />
        <PostComponent />
        <PostComponent />
      </div>
      <TrendingNow />
    </div>
  );
}

function PostComponent() {
  return (
    <div
      style={{
        margin: "1rem",
        width: "550px",
        height: "600px",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #DFDEDA",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "1rem",
        }}
      >
        <img
          src="./src/assets/react.svg"
          width={40}
          height={40}
          style={{
            padding: "5px",
            margin: "0.5rem",
            borderRadius: 100,
            backgroundColor: "silver",
          }}
        />
        <div>
          <strong>John Doe</strong>
          <p style={{ color: "gray" }}>Php Application developer at google</p>
          <p style={{ color: "gray" }}>2w •</p>
        </div>
      </div>
      <div style={{ padding: "1rem 2rem" }}>Test post</div>
    </div>
  );
}

function TrendingNow() {
  return (
    <div style={{ width: "400px", backgroundColor: "white", position: "absolute", right: "1rem"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <strong>Trending Now</strong>
        <img src="./src/assets/info.png" width={15} height={15} />
      </div>
    </div>
  );
}

export default App;
