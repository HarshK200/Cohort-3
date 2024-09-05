import styles from "./SendMoneyPopup.module.css";
import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { PublicKey } from "@solana/web3.js";

const SendMoneyPopup: React.FC<SendMoneyPopup> = ({ password, setSendMoneyPopupOpen, activeSession, balance }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>(1);
  const [toPubKey, setToPubKey] = React.useState<string>("");

  const handleSendMoney = async () => {
    setLoading(true);
    if (toPubKey === "" || !toPubKey) {
      toast.error("please enter recievers address");
      return;
    }
    try {
      // if the public key is valid do nothing and continue
      new PublicKey(toPubKey);
    } catch (e) {
      toast.error("Invalid Recievers address!");
      setLoading(false);
      return;
    }

    if (amount >= balance) {
      toast.error("Insufficient balance");
      setLoading(false);
      return;
    }

    const requestData: sendSol_RequestData = {
      password: password.current!,
      sender_pubkey: activeSession.active_wallet.public_key,
      sender_encryptedPrivatekey: activeSession.active_wallet.encrypted_private_key,
      reciever_publicKey: toPubKey,
      amount: amount,
    };

    try {
      const response = await axios.post("/api/sendsol", requestData);
      toast.success(`transcation completed!\nsignature:${response.data.transactionSignature}`);
      setLoading(false);
      setSendMoneyPopupOpen(false);
    } catch (e: any) {
      toast.error(e?.response.data?.error);
      setLoading(false);
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className={`glass ${styles.SendMoneyDiv}`}
    >
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.closeBtn}
        onClick={() => {
          setSendMoneyPopupOpen(false);
        }}
      />
      <h1>Send Sol</h1>
      <div className={styles.infoInputContainer}>
        <input
          type="number"
          className={styles.infoInput}
          placeholder="Amount"
          required
          value={amount}
          min={1}
          onChange={(e) => {
            if (parseFloat(e.target.value) >= balance) {
              toast.error("Insufficient balance");
              return;
            }
            if (parseFloat(e.target.value) <= 0) {
              toast.error("Invalid Amount");
              return;
            }
            setAmount(parseInt(e.target.value));
          }}
        />
        <input
          type="text"
          className={styles.infoInput}
          placeholder="recievers address"
          required
          value={toPubKey}
          onChange={(e) => setToPubKey(e.target.value)}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        className={`btn ${styles.sendbtn}`}
        onClick={handleSendMoney}
      >
        <PuffLoader loading={loading} color="white" size={30} />
        <span>{!loading && <FontAwesomeIcon icon={faPaperPlane} />}</span>
        Send
      </motion.button>
    </motion.div>
  );
};

export default SendMoneyPopup;
