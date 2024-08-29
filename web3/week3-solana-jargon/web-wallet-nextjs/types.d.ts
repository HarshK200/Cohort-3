interface OnboardingOptsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

interface SelectBlockchainProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}
interface BlockchainContainerProps extends SelectBlockchainProps {
  blockchain: { name: string; logo: any };
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
