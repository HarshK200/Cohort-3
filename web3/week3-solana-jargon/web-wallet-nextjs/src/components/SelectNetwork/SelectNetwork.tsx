import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { SolanaLogo } from "@public/index";
import { EtheriumLogo } from "@public/index";
import styles from "./selectNetwork.module.css";
import { supportedBlockchains } from "@/enums";

const supportedBlockhains = [
  { name: "Solana", id: supportedBlockchains.Solana, logo: <SolanaLogo className={styles.solanaLogo} /> },
  { name: "Etherium", id: supportedBlockchains.Etherium, logo: <EtheriumLogo className={styles.etheriumLogo} /> },
];

const SelectBlockchain: React.FC<SelectBlockchainProps> = ({
  currentComponent,
  setCurrentComponent,
  selectedBlockhain,
  setSelectedBlockchain,
}) => {
  return (
    <main className={`${styles.main}`}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="navigateLeftArrow"
        onClick={() => {
          if (currentComponent > 0) {
            setCurrentComponent(currentComponent - 1);
          }
        }}
      />
      <h1>Select Blockchain</h1>
      <p>We support mulitple blockchains, you can add more later.</p>
      <div className={styles.blockchainContainer}>
        {supportedBlockhains.map((blockchain: BlockchainContainerProps["blockchain"], index: number) => {
          return (
            <BlockchainContainer
              key={index}
              blockchain={blockchain}
              currentComponent={currentComponent}
              setCurrentComponent={setCurrentComponent}
              selectedBlockhain={selectedBlockhain}
              setSelectedBlockchain={setSelectedBlockchain}
            />
          );
        })}
      </div>
    </main>
  );
};

export default SelectBlockchain;

const BlockchainContainer: React.FC<BlockchainContainerProps> = ({
  blockchain,
  setCurrentComponent,
  setSelectedBlockchain,
}) => {
  return (
    <div
      className={`${styles.blockchainBlock} glass`}
      onClick={() => {
        setCurrentComponent(2);
        setSelectedBlockchain(blockchain.name);
      }}
    >
      {blockchain.logo}
      <h2>{blockchain.name}</h2>
    </div>
  );
};
