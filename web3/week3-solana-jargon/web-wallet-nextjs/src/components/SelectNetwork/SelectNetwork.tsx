import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import styles from "./selectNetwork.module.css";
import { SolanaLogo } from "@public/index";

interface SelectBlockchainProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

const SelectBlockchain: React.FC<SelectBlockchainProps> = ({ currentComponent, setCurrentComponent }) => {
  const supportedBlockhains = ["Solana", "Etherium"];

  return (
    <main className={`${styles.main}`}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={styles.leftArrow}
        onClick={() => {
          if (currentComponent > 0) {
            setCurrentComponent(currentComponent - 1);
          }
        }}
      />
      <h1>Select Blockchain</h1>
      <p>We support mulitple blockchains, you can add more later.</p>
      <div className={styles.blockchainContainer}>
        {supportedBlockhains.map((blockchainName: string) => {
          return <BlockchainContainer blockchainName={blockchainName} />;
        })}
      </div>
    </main>
  );
};

export default SelectBlockchain;

interface BlockchainContainerProps {
  blockchainName: string;
  // blockchainIcon: SVGRect;
}

const BlockchainContainer: React.FC<BlockchainContainerProps> = ({ blockchainName }) => {
  return (
    <div className={styles.blockchainBlock}>
      {/*<svg>blockchainIcon</svg>*/}
      <h2>{blockchainName}</h2>
      <SolanaLogo />
    </div>
  );
};
