"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { supported_RPCs, supportedSolanaRpcMethods } from "@/enums";

const Wallet = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [RPC_URL, setRPC_URL] = React.useState<string>(supported_RPCs.solana_devnet);
  const [balance, setBalance] = React.useState<number>();
  const [activeSession, setActiveSession] = React.useState<recentActiveSessionInfo>();

  React.useEffect(() => {
    const unlocked = sessionStorage.getItem("unlocked");
    if (!unlocked) {
      router.push("/");
      return;
    }
    const activeAccount = localStorage.getItem("recentActiveSession");
    if (activeAccount) {
      setActiveSession(JSON.parse(activeAccount) as recentActiveSessionInfo);
    } else {
      const secureUsers: secureUser[] = JSON.parse(localStorage.getItem("secureUsers")!);
      setActiveSession({
        active_accountId: secureUsers[0].accountId,
        active_wallet: secureUsers[0].wallets[0],
      });
    }
  }, []);

  React.useEffect(() => {
    if (activeSession) {
      const reqData: getaccountinfo_RequestData = {
        jsonrpc: "2.0",
        id: 0,
        method: supportedSolanaRpcMethods.getBalance,
        params: [activeSession?.active_wallet.public_key],
      };
      console.log(reqData);
      try {
        let response;
        axios.post(RPC_URL, reqData).then((res) => {
          response = res.data;
          console.log(response);
          setBalance(response.result.value / 1000000000); // converting lamports to sol
        });
      } catch (e) {
        console.log("Err making rpc call", e);
      }
    }
  }, [activeSession]);

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
