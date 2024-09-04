import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePassword.module.css";
import React from "react";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import EnterPassPopup from "../EnterPassPopup/EnterPassPopup";
import "react-toastify/dist/ReactToastify.css";

const CreatePassword: React.FC<CreatePassCompProps> = ({ mnemonic, selectedBlockhain }) => {
  const router = useRouter();
  const password = React.useRef<string>("");
  const cnfPassword = React.useRef<string>("");
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [passmatch, setPassmatch] = React.useState<boolean>(false);

  const onPassChange = () => {
    if (password.current === cnfPassword.current && password.current !== "") {
      setPassmatch(true);
      return;
    }
    setPassmatch(false);
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);

    // When user is onboaring for the first time
    if (!localStorage.getItem("secureUsers")) {
      const reqData: generateAccount_RequestData = {
        nextAvilAccountId: 0,
        password: password.current,
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
      router.push("/");
    }
    // when user already has account and creating a new one
    else {
      const secureUsers = JSON.parse(localStorage.getItem("secureUsers")!) as secureUser[];
      const nextAvilId: number = secureUsers.length;
      const reqData: generateAccount_RequestData = {
        nextAvilAccountId: nextAvilId,
        password: password.current,
        mnemonic: mnemonic!,
        blockchain_type: selectedBlockhain,
      };
      const response = await axios.post("/api/generateAccount", reqData);
      const newSecureUser = response.data.secureuser as secureUser;
      secureUsers.push(newSecureUser);
      localStorage.setItem("secureUsers", JSON.stringify(secureUsers));
      // making the current account and wallet to be active
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
  const unlocked = sessionStorage.getItem("unlocked");
  if (hashed_pass && unlocked) {
    const handlePassSubmit = async () => {
      setFormSubmitted(true);
      const correct = await bcrypt.compare(password.current, hashed_pass);
      if (correct) {
        sessionStorage.setItem("unlocked", JSON.stringify({ unlocked: true }));
        await handleSubmit();
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
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EnterPassPopup password={password} handleEnterPassSubmit={handlePassSubmit} loading={formSubmitted} />
        <ToastContainer />
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
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
          onChange={(e) => {
            password.current = e.target.value;
            onPassChange();
          }}
          required={true}
        />
        <input
          type="password"
          className={styles.confirmPassInput}
          placeholder="Confirm password"
          onChange={(e) => {
            cnfPassword.current = e.target.value;
            onPassChange();
          }}
          required={true}
        />
        <button
          type="submit"
          className={`btn glass ${styles.submitbtn} ${formSubmitted || !passmatch ? "disabled" : ""} `}
          onClick={handleSubmit}
        >
          <PuffLoader loading={formSubmitted} color="white" size={30} />
          <span>Submit</span>
        </button>
      </div>
    </main>
  );
};

export default CreatePassword;
