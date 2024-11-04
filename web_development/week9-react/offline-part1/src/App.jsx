import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const post = {
  profilePicURL: "./src/assets/react.svg",
  name: "John Doe",
  subtitle: "Php Application developer at google",
  posted: "2w •",
  content: "Test post",
};

function App() {
  const [posts, setPosts] = useState([]);

  function handleAddPost() {
    setPosts((prev) => [...prev, post]);
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#F4F2EE",
        fontFamily: "sans-serif",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Timer />
        <h1 style={{ padding: "2rem 0rem 0rem 0rem" }}>Linked In</h1>
        <button
          style={{ marginTop: "1rem", padding: "0.5rem" }}
          onClick={handleAddPost}
        >
          Add post
        </button>
        {posts.map((post, idx) => {
          return (
            <PostComponent
              key={idx}
              profilePicURL={post.profilePicURL}
              name={post.name}
              subtitle={post.subtitle}
              posted={post.posted}
              content={post.content}
            />
          );
        })}
      </div>
      <TrendingNow />
      <ProfileCard />
    </div>
  );
}

function Timer() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return <h1>{count}</h1>;
}

function PostComponent(props) {
  const { profilePicURL, name, subtitle, posted, content } = props;

  return (
    <div
      style={{
        margin: "1rem",
        width: "550px",
        height: "300px",
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
          src={profilePicURL}
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
          <strong>{name}</strong>
          <p style={{ color: "gray" }}>{subtitle}</p>
          <p style={{ color: "gray" }}>{posted}</p>
        </div>
      </div>
      <div style={{ padding: "1rem 2rem" }}>{content}</div>
    </div>
  );
}

function TrendingNow() {
  return (
    <div
      style={{
        width: "400px",
        height: "700px",
        backgroundColor: "white",
        position: "fixed",
        top: "5.5rem",
        right: "14rem",
        borderRadius: "10px",
        border: "1px solid #DFDEDA",
      }}
    >
      <div
        style={{
          marginTop: "1rem",
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

function ProfileCard() {
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        backgroundColor: "white",
        position: "fixed",
        top: "5.5rem",
        left: "15rem",
        borderRadius: "10px",
        border: "1px solid #DFDEDA",
      }}
    >
      <img
        style={{
          borderRadius: 100,
          width: 70,
          height: 70,
        }}
        src="https://media.licdn.com/dms/image/v2/D4D03AQFYY-2izHRG0w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1722313012220?e=1735171200&v=beta&t=Ek8I3Z-CMfrtnRk7uQkRdQl7KoH-hMxJWx6w6y8qu5k"
      />
    </div>
  );
}

export default App;
