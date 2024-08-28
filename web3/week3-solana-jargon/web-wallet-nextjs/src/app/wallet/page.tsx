"use client";

import { useState } from "react";

const Wallet = () => {
  const [unlocked, setUnlocked] = useState<boolean>(localStorage.getItem("isUnlocked") ? true : false);
  if(!unlocked) {
    return <>Enter your password</>
  }

  return <div style={{ color: "white" }}>Wallet</div>;
};

export default Wallet;
