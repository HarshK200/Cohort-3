"use client";
import React from "react";
import styles from "./EnterPasword.module.css";
import { PuffLoader } from "react-spinners";
import { FormEvent } from "react";
import * as bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const EnterPassword = () => {
  const [password, setPassword] = React.useState<string>("");
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const hashed_pass = localStorage.getItem("hashed_pass");
    if (hashed_pass) {
      bcrypt.compare(password, hashed_pass).then((correct) => {
        if (correct) {
          sessionStorage.setItem("unlocked", JSON.stringify({ unlocked: true }));
          router.push("/wallet");
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
      });
    } else {
      router.push("/onboarding");
    }
  };

  const enterPasswordFormVariants = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      key="form" // Key ensures that each component change triggers animation
      initial="initial"
      animate="animate"
      exit="exit"
      variants={enterPasswordFormVariants}
    >
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
    </motion.form>
  );
};

export default EnterPassword;
