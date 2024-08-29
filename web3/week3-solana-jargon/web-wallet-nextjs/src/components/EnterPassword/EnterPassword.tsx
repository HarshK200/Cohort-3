import React from "react";
import styles from "./EnterPasword.module.css";
import { PuffLoader } from "react-spinners";

const EnterPassword = () => {
  const [password, setPassword] = React.useState<string>("");
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);

  const handleSubmit = () => {};

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Create your password</h1>
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
    </main>
  );
};

export default EnterPassword;
