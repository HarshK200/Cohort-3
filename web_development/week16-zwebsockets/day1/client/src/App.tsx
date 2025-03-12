import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>();
  const [messages, setMessages] = useState<string[]>([]);
  const [chatboxMsg, setChatboxMsg] = useState<string>("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:4000");

    newSocket.onopen = () => {
      console.log("WS connection established");
    };
    newSocket.onmessage = (msg) => {
      setMessages((msgs) => [...msgs, msg.data as string]);
    };

    setSocket(newSocket);

    return () => {
      socket?.close();
    };
  }, []);

  function handleSendMsg(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      socket?.send(chatboxMsg);
      setChatboxMsg("");
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <center style={{ padding: "1rem" }}>Websocket Chat app</center>
          {messages.map((msg) => (
            <p key={msg}>{msg}</p>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <input
            placeholder="type a message..."
            style={{
              display: "flex",
              width: "80%",
              margin: "1rem",
              padding: "0.5rem",
            }}
            value={chatboxMsg}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChatboxMsg(e.target.value);
            }}
            onKeyDown={handleSendMsg}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
