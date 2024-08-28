interface MnemonicsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

interface MnemonicComponentProps {
  mnemonic: string;
}
