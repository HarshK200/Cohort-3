import styles from "./EnterPassPopup.module.css";
import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

const EnterPassPopup: React.FC<EnterPassPopupProps> = ({ password, setPassword, handleEnterPassSubmit, loading }) => {
  return (
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
          <PuffLoader loading={loading} color="white" size={30} />
          <span>Submit</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EnterPassPopup;
