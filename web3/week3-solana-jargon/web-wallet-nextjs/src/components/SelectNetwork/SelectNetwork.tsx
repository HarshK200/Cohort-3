import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { SolanaLogo } from "@public/index";
import { EtheriumLogo } from "@public/index";
import styles from "./selectNetwork.module.css";

interface SelectBlockchainProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}
interface BlockchainContainerProps extends SelectBlockchainProps {
  blockchain: { name: string; logo: any };
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
  currentComponent,
  setCurrentComponent,
}) => {
  return (
    <div
      className={styles.blockchainBlock}
      onClick={() => {
        setCurrentComponent(currentComponent + 1);
      }}
    >
      {blockchain.logo}
      <h2>{blockchain.name}</h2>
    </div>
  );
};
