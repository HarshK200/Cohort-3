"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { supported_RPCs, supportedSolanaRpcMethods } from "@/enums";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";

const Wallet = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [RPC_URL, setRPC_URL] = React.useState<string>(supported_RPCs.solana_devnet);
  const [balance, setBalance] = React.useState<number>();
  const [activeSession, setActiveSession] = React.useState<recentActiveSessionInfo>();
  const [unlocked, setUnlocked] = React.useState<object>();

  React.useEffect(() => {
    const unlocked = sessionStorage.getItem("unlocked");
    if (!unlocked) {
      router.push("/");
      return;
    } else {
      setUnlocked(JSON.parse(unlocked));
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
      try {
        // let response;
        // axios.post(RPC_URL, reqData).then((res) => {
        //   response = res.data;
        //   console.log(response);
        //   setBalance(response.result.value / 1000000000); // converting lamports to sol
        // });
      } catch (e) {
        console.log("Err making rpc call", e);
      }
    }
  }, [activeSession]);

  if (unlocked) {
    return (
      <main className={styles.main}>
        <Sidebar setActiveSession={setActiveSession} activeSession={activeSession} />
        <section className={styles.section}>
          <header className={styles.heading}>
            <h1>VAULT</h1>
          </header>
          <h1 className={styles.balance}>{0} Sol</h1>
        </section>
      </main>
    );
  }
};

export default Wallet;
