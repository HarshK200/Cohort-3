"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { supported_RPCs, supportedSolanaRpcMethods } from "@/enums";

const Wallet = () => {
  const router = useRouter();
  const [RPC_URL, setRPC_URL] = React.useState<string>(supported_RPCs.solana_devnet);
  const [balance, setBalance] = React.useState<number>();

  React.useEffect(() => {
    const unlocked = sessionStorage.getItem("unlocked");
    if (!unlocked) {
      router.push("/");
    }
    const activeAccount = localStorage.getItem("recentActiveSession");
    let activeSessionInfo: recentActiveSessionInfo;
    if (activeAccount) {
      activeSessionInfo = JSON.parse(activeAccount) as recentActiveSessionInfo;
    } else {
      const secureUsers: secureUser[] = JSON.parse(localStorage.getItem("secureUsers")!);
      activeSessionInfo = {
        active_accountId: secureUsers[0].accountId,
        active_wallet: secureUsers[0].wallets[0],
      };
    }
    const reqData: getaccountinfo_RequestData = {
      jsonrpcVersion: "2.0",
      id: Math.floor(Math.random() * 10),
      method: supportedSolanaRpcMethods.getBalance,
      params: [activeSessionInfo.active_wallet.public_key],
    };
    try {
      let response;
      axios.post(RPC_URL, reqData).then((res) => {
        response = res.data;
        console.log(response);
      });
    } catch (e) {
      console.log("Err making rpc call", e);
    }
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.heading}>
        <h1>WALLTY</h1>
      </header>
      <section className={styles.balance}>
        <h1>$ {balance}</h1>
      </section>
    </main>
  );
};

export default Wallet;
