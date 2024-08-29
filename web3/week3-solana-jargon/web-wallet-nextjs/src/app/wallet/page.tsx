"use client";
import React, { useState } from "react";
import styles from "../page.module.css";
import crypto from "node:crypto";
import EnterPassword from "@/components/EnterPassword/EnterPassword";

const Wallet = () => {
  const [unlocked, setUnlocked] = useState<boolean>(false);

  React.useEffect(() => {
    const walletUnlocked = localStorage.getItem("isUnlocked");
    if (walletUnlocked) {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return (
      <main>
        <EnterPassword />
      </main>
    );
  }

  return <div style={{ color: "white" }}>Wallet</div>;
};

const EnterPass = () => {
  return <main className={styles.enterPassContainer}></main>;
};

export default Wallet;
