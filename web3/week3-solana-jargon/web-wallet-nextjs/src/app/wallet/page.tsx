"use client";
import React, { useState } from "react";
import styles from "../page.module.css";
import crypto from "node:crypto";

const Wallet = () => {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  React.useEffect(() => {
    const unlocked = localStorage.getItem("isUnlocked");
    if (unlocked) {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return <div style={{ color: "white" }}>Enter your password</div>;
  }

  return <div style={{ color: "white" }}>Wallet</div>;
};


const EnterPass = () => {
  return <main className={styles.enterPassContainer}>
    </main>
}




export default Wallet;
