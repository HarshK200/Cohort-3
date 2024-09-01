import styles from "./WalletActionBtns.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const WalletActionBtns = () => {
  return <div className={styles.btnsContainer}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.02 }}
      className={`btn glass ${styles.createWalletBtn}`}
      onClick={() => console.log("i was clicked!")}
    >
      Add new wallet
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.02 }}
      className={`btn glass ${styles.sendMoneyBtn}`}
      onClick={() => console.log("i was clicked!")}
    >
      <FontAwesomeIcon icon={faArrowUp} />
      Send money
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.02 }}
      className={`btn glass ${styles.recieveMoneyBtn}`}
      onClick={() => console.log("i was clicked!")}
    >
      <FontAwesomeIcon icon={faArrowDown} />
      Recieve money
    </motion.button>
  </div>;
};

export default WalletActionBtns;
