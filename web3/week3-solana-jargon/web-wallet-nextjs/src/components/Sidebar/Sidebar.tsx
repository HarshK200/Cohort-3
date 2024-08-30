"use client";
import styles from "./Sidebar.module.css";
import { animate, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <motion.nav initial={{ x: 75 }} whileHover={{ x: 0 }} className={styles.sidebarContainer}>
      <motion.button style={{ position: "relative" }}>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.leftButton} />
      </motion.button>
      side
    </motion.nav>
  );
};

export default Sidebar;
