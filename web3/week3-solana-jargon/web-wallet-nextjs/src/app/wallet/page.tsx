"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { supportedBlockchains, supportedSolanaRpcMethods } from "@/enums";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { SolanaLogo } from "@public/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PuffLoader } from "react-spinners";
import bcrypt from "bcryptjs";

const Wallet = () => {
  const router = useRouter();
  const [RPC_URL, setRPC_URL] = React.useState<string>(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC!);
  const [balance, setBalance] = React.useState<number>();
  const [activeSession, setActiveSession] = React.useState<recentActiveSessionInfo>();
  const [selectedAccount, setSelectedAccount] = React.useState<secureUser>();
  const [unlocked, setUnlocked] = React.useState<object>();
  const [isEnterpassOpen, setIsEnterPassopen] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");

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

  async function handleEnterPassSubmit() {
    const hashed_pass = localStorage.getItem("hashed_pass");
    const correct = await bcrypt.compare(password, hashed_pass!);
    if (correct) {
      setIsEnterPassopen(false);
      handleCopyPrivateKey();
    } else {
      toast.error("Incorrect password!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setTimeout(() => {
      setPassword("");
    }, 60000); // sets the password to "" after 10 minutes
  }

  const handleCopyPrivateKey = () => {
    if (password !== "") {
      const reqData: decryptprivatekey_RequestData = {
        encrypted_private_key: activeSession?.active_wallet.encrypted_private_key!,
        password: password,
      };

      const response = axios.post("/api/decryptprivatekey", reqData).then(({ data }) => {
        toast.promise(response, {
          pending: {
            render() {
              return "Decrypting privatekey";
            },
          },
          success: {
            render() {
              navigator.clipboard.writeText(data.decryptedPrivateKey);
              return "Copyied to clipboard";
            },
          },
          error: "Err: please check your password",
        });
      });
    } else {
      toast.warn("please enter password!");
      setIsEnterPassopen(true);
    }
  };

  if (unlocked && selectedAccount) {
    return (
      <main className={styles.main}>
        <Sidebar setActiveSession={setActiveSession} activeSession={activeSession} />
        <section className={styles.section}>
          <header className={styles.heading}>
            <h1>VAULT</h1>
          </header>
          <h1 className={styles.balance}>{balance} Sol</h1>
          <div className={styles.walletsContainer}>
            {selectedAccount.wallets.map((wallet, index) => {
              return (
                <WalletContainer
                  key={index}
                  wallet={wallet}
                  activeSession={activeSession!}
                  handleCopyPrivateKey={handleCopyPrivateKey}
                />
              );
            })}
          </div>
        </section>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
        />

        <AnimatePresence>
          {isEnterpassOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`glass ${styles.enterPassDiv}`}
            >
              <h1>Enter password</h1>
              <div className={styles.passInputContainer}>
                <input
                  className={styles.passInput}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.01 }}
                  className={`btn ${styles.submitbtn}`}
                  onClick={handleEnterPassSubmit}
                >
                  <PuffLoader loading={false} color="white" size={30} />
                  <span>Submit</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }
};

export default Wallet;

const WalletContainer = ({ wallet, activeSession, handleCopyPrivateKey }: WalletContainerComponenetProps) => {
  const supportedBlockhains = [
    { name: supportedBlockchains.Solana, logo: <SolanaLogo className={styles.solanaLogo} /> },
    // { name: supportedBlockchains.Etherium, logo: <EtheriumLogo className={styles.etheriumLogo} /> },
  ];

  const handleCopyPublicKey = () => {
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
  };

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
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }} onClick={handleCopyPublicKey}>
          <FontAwesomeIcon icon={faCopy} className={styles.copyIcon} />
        </motion.div>
      </span>
      <span className={styles.keyContainer}>
        Private key:
        <input value={wallet.encrypted_private_key} disabled type="password" />
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }} onClick={handleCopyPrivateKey}>
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
