import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePassword.module.css";
import { FormEvent } from "react";
import React from "react";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import * as bcrypt from "bcryptjs";
import { toast } from "react-toastify";

const CreatePassword: React.FC<CreatePassCompProps> = ({ mnemonic, selectedBlockhain }) => {
  const router = useRouter();
  const [password, setPassword] = React.useState<string>("");
  const [cnfPassword, setCnfPassword] = React.useState<string>("");
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [passmatch, setPassmatch] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (password === cnfPassword && password !== "") {
      setPassmatch(true);
      return;
    }
    setPassmatch(false);
  }, [password, cnfPassword]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    // When user is onboaring for the first time
    if (!localStorage.getItem("secureUsers")) {
      const reqData: generateAccount_RequestData = {
        nextAvilAccountId: 0,
        password: password,
        mnemonic: mnemonic!,
        blockchain_type: selectedBlockhain,
      };
      const response = await axios.post("/api/generateAccount", reqData);
      const hashed_pass = response.data.hashed_pass;
      const newSecureUser = response.data.secureuser as secureUser;
      const secureusers: secureUser[] = [newSecureUser];
      localStorage.setItem("secureUsers", JSON.stringify(secureusers));
      localStorage.setItem("hashed_pass", hashed_pass);
      // making the current account and wallet to be active
      const recentActiveSession: recentActiveSessionInfo = {
        active_accountId: 0,
        active_wallet: newSecureUser.wallets[0],
      };
      localStorage.setItem("recentActiveSession", JSON.stringify(recentActiveSession));
    }
    // when user already has account and creating a new on
    else {
      const secureUsers = JSON.parse(localStorage.getItem("secureUsers")!) as secureUser[];
      const nextAvilId: number = secureUsers.length;
      const reqData: generateAccount_RequestData = {
        nextAvilAccountId: nextAvilId,
        password: password,
        mnemonic: mnemonic!,
        blockchain_type: selectedBlockhain,
      };
      const response = await axios.post("/api/generateAccount", reqData);
      const newSecureUser = response.data.secureuser as secureUser;
      console.log(newSecureUser);
      secureUsers.push(newSecureUser);
      localStorage.setItem("secureUsers", JSON.stringify(secureUsers));
      const recentActiveSession: recentActiveSessionInfo = {
        active_accountId: nextAvilId,
        active_wallet: newSecureUser.wallets[0],
      };
      localStorage.setItem("recentActiveSession", JSON.stringify(recentActiveSession));
    }

    setFormSubmitted(false);
    router.push("/wallet");
  };

  const hashed_pass = localStorage.getItem("hashed_pass");
  if (hashed_pass) {
    const handlePassSubmit = async (e: FormEvent<HTMLFormElement>) => {
      setFormSubmitted(true);
      const correct = await bcrypt.compare(password, hashed_pass);
      if (correct) {
        sessionStorage.setItem("unlocked", JSON.stringify({ unlocked: true }));
        await handleSubmit(e);
        return;
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
        setTimeout(() => {
          setFormSubmitted(false);
        }, 200);
      }
    };

    return (
      <form className={styles.form} onSubmit={handlePassSubmit}>
        <h1>Enter password</h1>
        <input
          type="password"
          className={styles.passInput}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={true}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.01 }}
          type="submit"
          className={`btn glass ${styles.submitbtn} ${formSubmitted ? "disabled" : ""} `}
        >
          <PuffLoader loading={formSubmitted} color="white" size={30} />
          <span>Submit</span>
        </motion.button>
      </form>
    );
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Create your password</h1>
        <div className={styles.infoTextContainer}>
          <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
          <h3>This is your local password</h3>
        </div>
        <p>We do not save any sensitive information in our database</p>
        <input
          type="password"
          className={styles.passInput}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={true}
        />
        <input
          type="password"
          className={styles.confirmPassInput}
          placeholder="Confirm password"
          value={cnfPassword}
          onChange={(e) => {
            setCnfPassword(e.target.value);
          }}
          required={true}
        />
        <button
          type="submit"
          className={`btn glass ${styles.submitbtn} ${formSubmitted || !passmatch ? "disabled" : ""} `}
        >
          <PuffLoader loading={formSubmitted} color="white" size={30} />
          <span>Submit</span>
        </button>
      </form>
    </main>
  );
};

export default CreatePassword;
