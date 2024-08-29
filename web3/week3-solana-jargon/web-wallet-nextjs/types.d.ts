interface OnboardingOptsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

interface SelectBlockchainProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
  selectedBlockhain: supportedBlockchains;
  setSelectedBlockchain: React.Dispatch<React.SetStateAction<supportedBlockchains>>;
}
interface BlockchainContainerProps extends SelectBlockchainProps {
  blockchain: { name: string; id: supportedBlockchains; logo: any };
}

interface MnemonicsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
  mnemonic: string[] | undefined;
}

interface MnemonicComponentProps {
  mnemonic: string;
}

interface CreatePassCompProps {
  mnemonic: string[] | undefined;
}

interface getEncryptedMnemonicReqData {
  password: string;
  mnemonic: string[];
}

interface secureUser {
  accountId: number;
  encryptedMnemonic: string;
}

interface generatemnemonic_ResponseData {
  mnemonic: string[];
}

interface generateAccount_RequestData {
  mnemonic: string[];
}
