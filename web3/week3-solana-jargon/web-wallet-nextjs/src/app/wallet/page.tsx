"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { supportedBlockchains, supportedSolanaRpcMethods } from "@/enums";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { easeIn, motion } from "framer-motion";
import { SolanaLogo } from "@public/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallet = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [RPC_URL, setRPC_URL] = React.useState<string>(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC!);
  const [balance, setBalance] = React.useState<number>();
  const [activeSession, setActiveSession] = React.useState<recentActiveSessionInfo>();
  const [selectedAccount, setSelectedAccount] = React.useState<secureUser>();
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
    const secureUsers: secureUser[] = JSON.parse(localStorage.getItem("secureUsers")!);
    if (secureUsers) {
      secureUsers.forEach((user) => {
        activeSession?.active_accountId === user.accountId ? setSelectedAccount(user) : null;
      });
    }
  }, [activeSession]);

  React.useEffect(() => {
    if (activeSession) {
      const reqData: getaccountinfo_RequestData = {
        jsonrpc: "2.0",
        id: 0,
        method: supportedSolanaRpcMethods.getBalance,
        params: [activeSession?.active_wallet.public_key],
      };
      try {
        let response;
        axios.post(RPC_URL, reqData).then((res) => {
          response = res.data;
          // console.log(response);
          setBalance(response.result.value / 1000000000); // converting lamports to sol
        });
      } catch (e) {
        console.log("Err making rpc call", e);
      }
    }
  }, [activeSession]);

  if (unlocked && selectedAccount) {
    return (
      <main className={styles.main}>
        <Sidebar setActiveSession={setActiveSession} activeSession={activeSession} />
        <section className={styles.section}>
          <header className={styles.heading}>
            <h1>VAULT</h1>
          </header>
          <h1 className={styles.balance}>{0} Sol</h1>
          <div className={styles.walletsContainer}>
            {selectedAccount.wallets.map((wallet, index) => {
              return <WalletContainer wallet={wallet} activeSession={activeSession!} />;
            })}
          </div>
        </section>
        <ToastContainer />
      </main>
    );
  }
};

export default Wallet;

const WalletContainer = ({ wallet, activeSession }: { wallet: wallet; activeSession: recentActiveSessionInfo }) => {
  const supportedBlockhains = [
    { name: supportedBlockchains.Solana, logo: <SolanaLogo className={styles.solanaLogo} /> },
    // { name: supportedBlockchains.Etherium, logo: <EtheriumLogo className={styles.etheriumLogo} /> },
  ];
  let wallet_blockchain_icon: React.JSX.Element;
  supportedBlockhains.forEach((ele) => {
    if (ele.name === wallet.blockchain_type) {
      wallet_blockchain_icon = ele.logo;
    }
  });

  return (
    <motion.div
      key={activeSession?.active_accountId!}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: easeIn }}
      className={`glass ${styles.wallet}`}
    >
      <span className={styles.keyContainer}>
        Public key:
        <input value={wallet.public_key} disabled />
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1 }}
          onClick={() => {
            navigator.clipboard.writeText(wallet.public_key).then(() => {
              toast.info("Copyied to clipboard!", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            });
          }}
        >
          <FontAwesomeIcon icon={faCopy} className={styles.copyIcon} />
        </motion.div>
      </span>
      <span className={styles.keyContainer}>
        Private key:
        <input value={wallet.encrypted_private_key} disabled type="password" />
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }}>
          <FontAwesomeIcon icon={faCopy} className={styles.copyIcon} />
        </motion.div>
      </span>
      <span className={styles.wallet_blockchain}>
        Blockchain:
        {wallet_blockchain_icon!}
      </span>
    </motion.div>
  );
};
