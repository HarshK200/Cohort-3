import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import styles from "./Mnemonic.module.css";
import axios from "axios";

interface MnemonicsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

const Mnemonics: React.FC<MnemonicsComponentProps> = ({ currentComponent, setCurrentComponent }) => {
  const [mnemonic, setMnemonic] = React.useState<string[]>();

  useEffect(() => {
    axios.get("/api/generatemnemonic").then((response) => {
      setMnemonic(response.data.mnemonic);
      // localStorage.setItem(`mnemonic`, response.data.mnemonic);
      console.log(response.data);
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
      <div
        className={styles.wordsGird}
        onClick={async () => {
          await navigator.clipboard.writeText(mnemonic?.join(" ")!);
        }}
      >
        {mnemonic ? (
          mnemonic.map((e: string, index: number) => {
            return <Mnemonic key={index} mnemonic={e} />;
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
    </main>
  );
};

interface MnemonicComponentProps {
  mnemonic: string;
}

const Mnemonic: React.FC<MnemonicComponentProps> = ({ mnemonic }) => {
  return (
    <div className={styles.wordBox}>
      <h3>{mnemonic}</h3>
    </div>
  );
};

export default Mnemonics;
