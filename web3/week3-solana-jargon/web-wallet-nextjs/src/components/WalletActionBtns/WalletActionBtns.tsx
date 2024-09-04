import styles from "./WalletActionBtns.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { supportedBlockchains } from "@/enums";
import axios from "axios";
import { toast } from "react-toastify";

const WalletActionBtns: React.FC<walletActioBtnsComponentProps> = ({
  password,
  setPassPopupOpen,
  passPopupCallback,
  setActiveSession,
  setSendMoneyPopupOpen,
}) => {
  const handleCreateWallet = async () => {
    const activeSession = localStorage.getItem("recentActiveSession");
    const secureUsersString = localStorage.getItem("secureUsers");
    // activeSession will always be there when this function get's called this is just to be extra secrue
    if (activeSession && secureUsersString) {
      const activeAccountId: number = JSON.parse(activeSession)?.active_accountId;
      const secureUsers = JSON.parse(secureUsersString) as secureUser[];

      let activeuser: secureUser;
      let indexOfactiveUser: number;
      secureUsers.forEach((user, index) => {
        if (user.accountId === activeAccountId) {
          activeuser = user;
          indexOfactiveUser = index;
          return;
        }
      });

      const lastCreatedWallet = activeuser!?.wallets[activeuser!?.wallets.length - 1];
      const nextAvilWalletId = lastCreatedWallet.wallet_id + 1;

      if (password.current === "") {
        toast.warn("please enter password and try again");
        passPopupCallback.current = handleCreateWallet;
        setPassPopupOpen(true);
      } else {
        const requestData: generateWallet_RequestData = {
          blockchain_type: supportedBlockchains.Solana, // TODO: add a popup that asks for blockchain_type
          password: password.current!,
          encryptedMnemonic: activeuser!?.encryptedMnemonic,
          nextAvilWalletId: nextAvilWalletId,
        };

        const response = await axios.post("/api/generatewallet", requestData);
        const generatedWallet = response.data as wallet;

        activeuser!.wallets.push(generatedWallet);

        const newActiveSessionInfo: recentActiveSessionInfo = {
          active_accountId: activeuser!.accountId,
          active_wallet: generatedWallet,
        };
        // updating the active session info i.e. active account and active wallet in localStorage and the state
        localStorage.setItem("recentActiveSession", JSON.stringify(newActiveSessionInfo));
        secureUsers[indexOfactiveUser!] = activeuser!;
        localStorage.setItem("secureUsers", JSON.stringify(secureUsers));
        // IMPORTANT! this HAS! to happen after setting the secureUsers
        setActiveSession(newActiveSessionInfo);
        toast.success("Successfully generated new wallet!");
      }
    } else {
      console.log("no active account session");
    }
  };

  const handleSendMoney = () => {
    if (password.current === "") {
      passPopupCallback.current = handleSendMoney;
      setPassPopupOpen(true);
      toast.warn("please enter password and try again");
      return;
    }
    setSendMoneyPopupOpen(true);
  };

  return (
    <div className={styles.btnsContainer}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
        className={`btn glass ${styles.createWalletBtn}`}
        onClick={handleCreateWallet}
      >
        Add new wallet
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
        className={`btn glass ${styles.sendMoneyBtn}`}
        onClick={handleSendMoney}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        Send Sol
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.02 }}
        className={`btn glass ${styles.recieveMoneyBtn}`}
        onClick={() => console.log("i was clicked!")}
      >
        <FontAwesomeIcon icon={faQrcode} />
        Recieve Sol
      </motion.button>
    </div>
  );
};

export default WalletActionBtns;
