"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { supportedBlockchains, supportedSolanaRpcMethods } from "@/enums";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { AnimatePresence, delay, easeIn, motion } from "framer-motion";
import { SolanaLogo } from "@public/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import WalletActionBtns from "@/components/WalletActionBtns/WalletActionBtns";
import EnterPassPopup from "@/components/EnterPassPopup/EnterPassPopup";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import SendMoneyPopup from "@/components/SendMoneyPopup/SendMoneyPopup";

const Wallet = () => {
  const router = useRouter();
  const [RPC_URL, setRPC_URL] = React.useState<string>(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC!);
  // const [RPC_URL, setRPC_URL] = React.useState<string>(process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC!);
  // const [RPC_URL, setRPC_URL] = React.useState<string>("http://localhost:8899");
  const [balance, setBalance] = React.useState<number>();
  const [activeSession, setActiveSession] = React.useState<recentActiveSessionInfo>();
  const [selectedAccount, setSelectedAccount] = React.useState<secureUser>();
  const [unlocked, setUnlocked] = React.useState<object>();
  const [passPopupOpen, setPassPopupOpen] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [passPopupLoading, setPassPopupLoading] = React.useState<boolean>(false);
  const [selecteWalletDropdownOpen, setSelecteWalletDropdownOpen] = React.useState<boolean>(false);
  const [sendMoneyPopupOpen, setSendMoneyPopupOpen] = React.useState<boolean>(false);
  const passPopupCallback = useRef<() => void>();

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
      if (secureUsers) {
        setActiveSession({
          active_accountId: secureUsers[0].accountId,
          active_wallet: secureUsers[0].wallets[0],
        });
      } else {
        router.push("/onboarding");
      }
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
          setBalance(response.result.value / LAMPORTS_PER_SOL); // converting lamports to sol
        });
      } catch (e) {
        console.log("Err making rpc call", e);
      }
    }
  }, [activeSession]);

  async function handleEnterPassSubmit() {
    setPassPopupLoading(true);

    try {
      const hashed_pass = localStorage.getItem("hashed_pass");
      if (!hashed_pass) {
        throw new Error("No hashed password found!");
      }

      const correct = await bcrypt.compare(password, hashed_pass!);
      if (correct) {
        setPassPopupOpen(false);
        setPassPopupLoading(false);

        if (passPopupCallback.current) {
          console.log(passPopupCallback.current);
          passPopupCallback.current!();
          passPopupCallback.current = undefined;
        } else {
          setPassPopupLoading(false);
          toast.error("Incorrect password!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setPassword("");
    }
  }

  if (unlocked && selectedAccount) {
    return (
      <main className={styles.main}>
        <Sidebar setActiveSession={setActiveSession} activeSession={activeSession} />
        <section className={styles.section}>
          <header className={styles.heading}>
            <h1>VAULT</h1>
          </header>
          <h1 className={styles.balance}>{balance} Sol</h1>
          <WalletActionBtns
            password={password}
            setActiveSession={setActiveSession}
            setPassPopupOpen={setPassPopupOpen}
            setSendMoneyPopupOpen={setSendMoneyPopupOpen}
          />
          <div className={styles.walletsContainer}>
            <WalletContainer
              key={activeSession?.active_wallet.wallet_id}
              wallet={activeSession!?.active_wallet}
              activeSession={activeSession!}
              setActiveSession={setActiveSession}
              password={password}
              setPassPopupOpen={setPassPopupOpen}
              passPopupCallback={passPopupCallback}
            />
          </div>
        </section>

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={false}
          pauseOnHover={true}
          theme="dark"
        />

        <AnimatePresence>
          {passPopupOpen && (
            <EnterPassPopup
              password={password}
              setPassword={setPassword}
              handleEnterPassSubmit={handleEnterPassSubmit}
              loading={passPopupLoading}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          _
          <div className={styles.selectedWalletWrapper}>
            <AnimatePresence>
              {selecteWalletDropdownOpen && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 100 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className={`glass ${styles.selectWalletDropdownOptions}`}>
                    {selectedAccount.wallets.toReversed().map((wallet) => {
                      if (wallet.wallet_id !== activeSession?.active_wallet.wallet_id) {
                        return (
                          <motion.div
                            key={wallet.wallet_id}
                            className={styles.walletOption}
                            whileHover={{ scale: 1.05, opacity: "50%" }}
                            onClick={() => {
                              const updatedActiveSession: recentActiveSessionInfo = {
                                active_accountId: activeSession!?.active_accountId,
                                active_wallet: wallet,
                              };
                              localStorage.setItem("recentActiveSession", JSON.stringify(updatedActiveSession));
                              setActiveSession(updatedActiveSession);
                              setSelecteWalletDropdownOpen(false);
                            }}
                          >
                            <span>Wallet {wallet.wallet_id + 1}</span>
                          </motion.div>
                        );
                      }
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className={styles.selectedWallet}
              onClick={() => {
                setSelecteWalletDropdownOpen(!selecteWalletDropdownOpen);
              }}
            >
              Wallet {activeSession?.active_wallet.wallet_id! + 1}
              <FontAwesomeIcon icon={faCaretUp} />
            </div>
          </div>
        </AnimatePresence>
        <AnimatePresence>
          {sendMoneyPopupOpen && (
            <SendMoneyPopup
              password={password}
              setSendMoneyPopupOpen={setSendMoneyPopupOpen}
              activeSession={activeSession!}
              balance={balance!}
            />
          )}
        </AnimatePresence>
      </main>
    );
  }
};

export default Wallet;

const WalletContainer = ({
  wallet,
  activeSession,
  setActiveSession,
  password,
  setPassPopupOpen,
  passPopupCallback,
}: WalletContainerComponenetProps) => {
  const supportedBlockhains = [
    { name: supportedBlockchains.Solana, logo: <SolanaLogo className={styles.solanaLogo} /> },
    // { name: supportedBlockchains.Etherium, logo: <EtheriumLogo className={styles.etheriumLogo} /> },
  ];

  const handleCopyPrivateKey = () => {
    if (password !== "") {
      const reqData: decryptprivatekey_RequestData = {
        encrypted_private_key: wallet.encrypted_private_key,
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
      toast.warn("please enter password and try again");
      passPopupCallback.current = handleCopyPrivateKey;
      setPassPopupOpen(true);
    }
  };

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
      <div className={styles.WalletNumber}>
        Wallet {wallet.wallet_id + 1}
        <span className={styles.wallet_blockchain}>
          Blockchain:
          {wallet_blockchain_icon!}
        </span>
      </div>
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
      <motion.button
        className={`btn glass ${styles.getBalanceBtn}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
        onClick={() => {
          setActiveSession({ ...activeSession, active_wallet: wallet });
        }}
      >
        Get Balance
      </motion.button>
    </motion.div>
  );
};
