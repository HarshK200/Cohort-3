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
  blockchain: { name: supportedBlockchains; logo: any };
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
  selectedBlockhain: supportedBlockchains;
}

interface getEncryptedMnemonicReqData {
  password: string;
  mnemonic: string[];
}

interface wallet {
  blockchain_type: supportedBlockchains; // would be somthing like [Solana, Etherium]
  public_key: string;
  encrypted_private_key: string;
}

interface secureUser {
  // also called an account
  accountId: number;
  encryptedMnemonic: string;
  wallets: wallet[];
}

interface recentActiveSessionInfo {
  active_accountId: number;
  active_wallet: wallet;
}

interface generatemnemonic_ResponseData {
  mnemonic: string[];
}

interface generateAccount_RequestData {
  nextAvilAccountId: number;
  mnemonic: string[];
  password: string;
  blockchain_type: supportedBlockchains;
}

interface generateAccount_ResponseData extends secureUser {}

interface getaccountinfo_RequestData {
  jsonrpc: string;
  id: number;
  method: string;
  params: string[];
}
