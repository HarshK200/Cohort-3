import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePassword.module.css";
import { FormEvent } from "react";
import React from "react";

const CreatePassword: React.FC<CreatePassCompProps> = ({ mnemonic }) => {
  const [password, setPassword] = React.useState<string>();
  const [cnfPassword, setCnfPassword] = React.useState<string>();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Create your password</h1>
        <div className={styles.infoText}>
          <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
          <h3>This is your local password</h3>
        </div>
        <input
          type="password"
          className={styles.passInput}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          className={styles.confirmPassInput}
          placeholder="Confirm password"
          value={cnfPassword}
          onChange={(e) => {
            setCnfPassword(e.target.value);
          }}
        />
        <button type="submit" className={`btn glass ${styles.submitbtn}`}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default CreatePassword;
