"use client";
import styles from "./Sidebar.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC<{
  setActiveSession: React.Dispatch<React.SetStateAction<recentActiveSessionInfo | undefined>>;
  activeSession: recentActiveSessionInfo | undefined;
}> = ({ setActiveSession, activeSession }) => {
  const [secureUsers, setSecureUsers] = useState<secureUser[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const secureUsersLocal = localStorage.getItem("secureUsers");
    if (secureUsersLocal) {
      setSecureUsers(JSON.parse(secureUsersLocal));
    }
    const activeSessionLocal = localStorage.getItem("recentActiveSession");
    if (activeSessionLocal) {
      setActiveSession(JSON.parse(activeSessionLocal!));
    }
  }, []);

  React.useEffect(() => {
    if (activeSession) {
      localStorage.setItem("recentActiveSession", JSON.stringify(activeSession));
    }
  }, [activeSession]);

  const sidebarVariant = {
    hidden: {
      x: 95,
    },
    hover: {
      x: isOpen ? 0 : 87,
    },
    open: {
      x: 0,
    },
  };

  if (secureUsers && activeSession) {
    return (
      <motion.nav
        variants={sidebarVariant}
        initial="hidden"
        whileHover="hover"
        animate={isOpen ? "open" : ""}
        className={styles.sidebarContainer}
      >
        <motion.div className={styles.openCloseBtnDiv}>
          {!isOpen ? (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={styles.openCloseBtn}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.openCloseBtn}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
        </motion.div>
        <div className={styles.userContainer}>
          {secureUsers.map((currUser: secureUser) => {
            return (
              <Account
                key={currUser.accountId}
                user={currUser}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
              />
            );
          })}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={styles.addAccountPlus}
            onClick={() => {
              router.push("/onboarding");
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </motion.div>
        </div>
      </motion.nav>
    );
  }
};

export default Sidebar;

const Account: React.FC<AccountComponentProps> = ({ user, activeSession, setActiveSession }) => {
  const handleClick = () => {
    setActiveSession!({
      active_accountId: user.accountId,
      active_wallet: user.wallets[0],
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      className={`${styles.user} ${activeSession.active_accountId === user.accountId ? styles.activeUser : ""}`}
      onClick={handleClick}
    >
      A {user.accountId + 1}
    </motion.div>
  );
};
