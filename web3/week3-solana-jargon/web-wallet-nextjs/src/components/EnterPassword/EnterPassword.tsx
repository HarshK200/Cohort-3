import React from "react";
import styles from "./EnterPasword.module.css";
import { PuffLoader } from "react-spinners";
import { FormEvent } from "react";

const EnterPassword = () => {
  const [password, setPassword] = React.useState<string>("");
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
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
