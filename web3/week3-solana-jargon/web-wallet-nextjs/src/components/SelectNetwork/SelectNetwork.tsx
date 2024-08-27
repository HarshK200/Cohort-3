import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import styles from "./selectNetwork.module.css";
import { SolanaLogo } from "@public/index";
import { EtheriumLogo } from "@public/index";

interface SelectBlockchainProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}
interface blockchain {
  name: string;
  logo: any;
}
interface BlockchainContainerProps {
  blockchain: blockchain;
}

const SelectBlockchain: React.FC<SelectBlockchainProps> = ({ currentComponent, setCurrentComponent }) => {
  const supportedBlockhains = [
    { name: "Solana", logo: <SolanaLogo className={styles.solanaLogo} /> },
    { name: "Etherium", logo: <EtheriumLogo className={styles.etheriumLogo} /> },
  ];

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
        {supportedBlockhains.map((blockchain: blockchain) => {
          return <BlockchainContainer blockchain={blockchain} />;
        })}
      </div>
    </main>
  );
};

export default SelectBlockchain;

const BlockchainContainer: React.FC<BlockchainContainerProps> = ({ blockchain }) => {
  return (
    <div className={styles.blockchainBlock} onClick={() => {}}>
      {blockchain.logo}
      <h2>{blockchain.name}</h2>
    </div>
  );
};
