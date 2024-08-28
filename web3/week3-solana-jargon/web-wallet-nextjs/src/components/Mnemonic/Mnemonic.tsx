"use client"
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./Mnemonic.module.css";
import axios from "axios";
import Link from "next/link";

const Mnemonics: React.FC<MnemonicsComponentProps> = ({ currentComponent, setCurrentComponent }) => {
  const [mnemonic, setMnemonic] = React.useState<string[]>();
  const [wordsHidden, setWordsHidden] = React.useState<boolean>(true);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/generatemnemonic").then((response) => {
      setMnemonic(response.data.mnemonic);
      // console.log(response.data);
    });
  }, []);

  return (
    <main className={styles.main}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="navigateLeftArrow"
        onClick={() => {
          if (currentComponent > 0) {
            setCurrentComponent(currentComponent - 1);
          }
        }}
      />
      <h1>Your Seed Phrase</h1>
      <p className={styles.warningText}>
        <FontAwesomeIcon icon={faTriangleExclamation} className={styles.warningSign} />
        Warning! save your seed phrase if you lose this your's account will be unrecoverable
      </p>
      <div className={`glass`}>
        <div
          className={`${styles.wordsGrid} ${wordsHidden ? styles.blur : ""}`}
          onClick={async () => {
            if (wordsHidden) {
              setWordsHidden(false);
              return;
            }
            await navigator.clipboard.writeText(mnemonic?.join(" ")!);
            setIsCopied(true);
          }}
        >
          {mnemonic ? (
            mnemonic.map((e: string, index: number) => {
              return <Mnemonic key={index} mnemonic={e} />;
            })
          ) : (
            <div style={{ placeSelf: "center", gridColumn: "1 / -1" }}>Loading</div>
          )}
        </div>
        <div className={styles.infoText}>
          {wordsHidden ? "Click to reveal" : isCopied ? "Copied to clipboard!" : "Click to copy"}
        </div>
      </div>
      <div className={styles.confirmContainer}>
        <input
          id="confirmCheckbox"
          className={styles.checkbox}
          type="checkbox"
          onClick={(e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            setIsChecked(checked);
          }}
        />
        <label htmlFor="confirmCheckbox">I have saved my seed phrase</label>
      </div>
      <Link
        href={"/wallet"}
        className={`btn ${styles.nextbtn} glass ${isChecked ? "" : styles.disabled}`}
        onClick={() => {
          localStorage.setItem("mnemonic", JSON.stringify(mnemonic));
        }}
      >
        Next
      </Link>
    </main>
  );
};

const Mnemonic: React.FC<MnemonicComponentProps> = ({ mnemonic }) => {
  return (
    <div className={styles.wordBox}>
      <h3>{mnemonic}</h3>
    </div>
  );
};

export default Mnemonics;
