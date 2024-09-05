import styles from "./OnboardingOptions.module.css";
import { motion } from "framer-motion";

const OnboardingOptions: React.FC<OnboardingOptsComponentProps> = ({ setCurrentComponent }) => {
  return (
    <main className={`${styles.btnContainer}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        className={`btn ${styles.createButton}`}
        onClick={() => {
          setCurrentComponent(1);
        }}
      >
        Create wallet
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        className={`btn glass ${styles.importButton}`}
      >
        Import wallet
      </motion.button>
    </main>
  );
};

export default OnboardingOptions;
