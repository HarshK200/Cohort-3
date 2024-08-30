"use client";
import React from "react";
import styles from "./EnterPasword.module.css";
import { PuffLoader } from "react-spinners";
import { FormEvent } from "react";
import * as bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <button type="submit" className={`btn glass ${styles.submitbtn} ${formSubmitted ? "disabled" : ""} `}>
        <PuffLoader loading={formSubmitted} color="white" size={30} />
        <span>Submit</span>
      </button>
    </form>
  );
};

export default EnterPassword;
