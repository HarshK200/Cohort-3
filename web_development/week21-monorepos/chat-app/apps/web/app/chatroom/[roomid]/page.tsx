"use client";

import { TextInput } from "@repo/ui/input";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Room() {
  const { roomid: roomId } = useParams();
  const [msgBox, setMsgBox] = useState<string>("");

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ padding: "1rem" }}>Room Id: {roomId}</h2>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <TextInput
          width={"50%"}
          value={msgBox}
          onChange={(e) => {
            setMsgBox(e.target.value);
          }}
        />
        <button style={{ width: "5%" }}>Send</button>
      </div>
    </div>
  );
}
