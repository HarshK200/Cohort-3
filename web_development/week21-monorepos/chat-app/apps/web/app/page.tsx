"use client";

import { TextInput } from "@repo/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="roomId">Room id</label>
        <TextInput
          id="roomId"
          name="roomId"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />
      </div>
      <button
        style={{
          width: "10rem",
          padding: "0.5rem",
        }}
        onClick={() => {
          console.log(`Joining room with id ${roomId}`);
          router.push(`/chatroom/${roomId}`);
        }}
      >
        Join room
      </button>
    </div>
  );
}
